import React, { useEffect, useRef, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Image,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Animated, { FadeInUp } from "react-native-reanimated";
import styles from "./indexstyles";

// API key for Google Gemini AI
const API_KEY = "AIzaSyDmlzuuhU8bWA5t3hDCnkuhTkueTQCDmco";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Type definition for chat messages
type ChatMessage = {
    role: "user" | "bot";
    text: string;
    file?: {
        uri: string;
        fileName: string;
        mimeType: string;
        isImage: boolean;
    };
};

// ✅ Accept inputText & setInputText as props for suggested items
type ChatScreenProps = {
    inputText: string;
    setInputText: (text: string) => void;
    setConversationStarted: (started: boolean) => void; // ✅ Add this line
};

export default function ChatScreen({ inputText, setInputText, setConversationStarted }: ChatScreenProps)
    {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isBotTyping, setIsBotTyping] = useState<boolean>(false);
    const [file, setFile] = useState<ChatMessage["file"] | null>(null);
    const chatListRef = useRef<FlatList<ChatMessage>>(null);

    // Auto-scroll when new messages arrive
    useEffect(() => {
        setTimeout(() => {
            chatListRef.current?.scrollToEnd({ animated: true });
        }, 200);
    }, [messages]);

    // Function to send a message
    const sendMessage = async () => {
        if (!inputText.trim() || isBotTyping) return;

        setConversationStarted(true); // ✅ Hide suggestions when chat starts

        const newUserMessage: ChatMessage = { role: "user", text: inputText, file: file || undefined };
        setMessages((prev) => [...prev, newUserMessage]);

        setInputText(""); // Clear input field
        setFile(null);
        setIsBotTyping(true); // Show bot typing status

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ contents: [{ parts: [{ text: inputText }] }] }),
            });

            const data = await response.json();
            const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I didn't understand that.";

            const newBotMessage: ChatMessage = { role: "bot", text: botReply };
            setMessages((prev) => [...prev, newBotMessage]);
        } catch (error) {
            console.error("Error fetching response:", error);
        } finally {
            setIsBotTyping(false);
        }
    };

    // Function to handle file selection
    const pickFile = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets?.length > 0) {
            const fileData = result.assets[0];
            setFile({
                uri: fileData.uri,
                fileName: fileData.fileName || fileData.uri.split("/").pop() || "file",
                mimeType: fileData.mimeType || "unknown",
                isImage: fileData.mimeType?.startsWith("image/") || false,
            });
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/* Chat messages */}
            <FlatList
                ref={chatListRef}
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Animated.View
                        entering={FadeInUp.duration(300)}
                        style={[styles.messageBubble, item.role === "user" ? styles.userMessage : styles.botMessage]}
                    >
                        <Text style={styles.messageText}>{item.text}</Text>
                        
                    </Animated.View>
                )}
            />

            {/* Input field and buttons */}
            <View style={styles.promptContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Ask Bkim AI anything..."
                    placeholderTextColor="#7788aa"
                    value={inputText}
                    onChangeText={setInputText}
                />

                <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                    <Text>{isBotTyping ? "⏳" : "➤"}</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

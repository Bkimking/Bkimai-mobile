import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import styles from './indexstyles';
import ChatScreen from './script'; // ✅ Ensure correct import

const BkimAI = () => {
  const [inputText, setInputText] = useState('');
  const [conversationStarted, setConversationStarted] = useState(false);


  // ✅ Function to handle suggested item selection
  const handleSuggestedItem = (question: string) => {
    setInputText(question);
    setConversationStarted(true); // ✅ Hide suggestions
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Welcome to Bkim AI</Text>
        <Image source={require('../assets/images/Bkim-ai-latest-2.png')} style={styles.logo} />
      </View>
      <Text style={styles.subHeading}>Your smart assistant for coding & tech</Text>

      {/* Suggested Questions (Hidden when chat starts) */}
      {!conversationStarted && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsContainer}>
          {["Code in Python...", "Learn Laravel...", "AI Tools...", "Build a Website..."].map((question, index) => (
            <TouchableOpacity key={index} style={styles.suggestionItem} onPress={() => handleSuggestedItem(question)}>
              <Text style={styles.suggestionText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Chat Container */}
      <ChatScreen inputText={inputText} setInputText={setInputText} setConversationStarted={setConversationStarted} />

      {/* Disclaimer */}
      <Text style={styles.disclaimer}>Bkim AI can make mistakes, please double-check responses.</Text>
    </View>
  );
};

export default BkimAI;

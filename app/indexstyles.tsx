import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // 1) Main Container
  container: {
    flex: 1,
    backgroundColor: "#f0f5ff",
    paddingHorizontal: 15,
    paddingVertical: 5,
    paddingTop: 20,
  },

  // 2) Header
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#050a12",
  },
  logo: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  subHeading: {
    textAlign: "center",
    fontSize: 16,
    color: "#667799",
    marginTop: -5,
  },

  // 3) Suggested Questions (minimal vertical space)
  suggestionsContainer: {
    marginTop: 10,
    marginBottom: 5, // Keep it small so chat gets more room
  },
  suggestionItem: {
    backgroundColor: "#e4edfc",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    height: 40,
    justifyContent: "center",
    elevation: 2,
  },
  suggestionText: {
    fontSize: 14,
    color: "#1d7efd",
    fontWeight: "bold",
  },

  // 4) Chat Container (fills the remaining space)
  chatContainer: {
    flex: 1, // Takes up the largest portion
    marginTop: 5,
    marginBottom: 5, // Space before the input
    paddingHorizontal: 5,
  },

  // 5) Chat Bubbles
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 15,
    marginVertical: 5,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#4CAF50",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#007BFF",
  },
  messageText: {
    color: "#fff",
  },

  // 6) Prompt (Input + Send Button)
  promptContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 8,
    elevation: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#050a12",
    paddingHorizontal: 5,
  },
  sendButton: {
    backgroundColor: "#0565e4",
    borderRadius: 20,
    padding: 10,
    marginLeft: 5,
    elevation: 2,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
  },

  // 7) Disclaimer
  disclaimer: {
    textAlign: "center",
    fontSize: 12,
    color: "#7788aa",
    marginTop: 5,
  },
});

export default styles;

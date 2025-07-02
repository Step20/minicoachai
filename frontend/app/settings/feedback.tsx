import HeaderTopBack from "@/components/HeaderTopBack";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";

export default function FeedbackScreen() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    // Simulate sending feedback
    Alert.alert("Thank You!", "Your feedback has been submitted.");
    setFeedback("");
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Feedback" screen={"/settings"} />
      <Text style={styles.label}>We’d love to hear your thoughts:</Text>
      <TextInput
        value={feedback}
        onChangeText={setFeedback}
        placeholder="What's working? What can we improve?"
        placeholderTextColor="#888"
        multiline
        numberOfLines={6}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={!feedback.trim()}
      >
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 16 },
  label: { color: "#ccc", fontSize: 15, marginBottom: 8 },
  input: {
    borderColor: "#555",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#17191A",
    padding: 12,
    color: "#fff",
    marginBottom: 20,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#FFB2E3",
    borderRadius: 20,
    paddingVertical: 14,
  },
  buttonText: {
    color: "#17191A",
    fontWeight: "bold",
    textAlign: "center",
  },
});

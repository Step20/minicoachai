import HeaderTopBack from "@/components/HeaderTopBack";
import { Header } from "@react-navigation/elements";
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

export default function SupportScreen() {
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    // Simulate email support (can use EmailJS or backend later)
    Alert.alert("Support Message Sent", "We'll get back to you shortly.");
    setMessage("");
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Support" screen={"/settings"} />
      <Text style={styles.label}>Describe your issue:</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your question or issue..."
        placeholderTextColor="#888"
        multiline
        numberOfLines={6}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit}
        disabled={!message.trim()}
      >
        <Text style={styles.buttonText}>Send Message</Text>
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

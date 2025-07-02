// app/signup.tsx
import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Platform,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      Alert.alert("Success", "Account created!");
      router.replace("/");
    } catch (error) {
      Alert.alert("Signup Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Forgot Account
      </Text>
      <Text style={{ color: "#ccc", fontSize: 15, opacity: 0.5 }}>
        Enter your details to retrieve account.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={[styles.input, { marginTop: 45 }]}
        onChangeText={setEmail}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 14 }}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.footerText}>Already have an account? </Text>
        <Text style={{ fontWeight: "bold", color: "#aaa" }}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  terms: {
    color: "#ccc",
    position: "absolute",
    bottom: 20,
    fontSize: 10,
    opacity: 0.45,
    textAlign: "center",
    width: "80%",
    margin: "auto",
  },
  logo: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  input: {
    backgroundColor: "#1C1C1E",
    width: "100%",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 12,
    color: "#fff",
  },
  button: {
    backgroundColor: "#FFB2E3",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 17,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#17191A", fontWeight: "bold" },
  footerText: { color: "#aaa" },
});

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

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const router = useRouter();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const MAX_USERNAME_LENGTH = 30;

  const handleSignup = async () => {
    setEmailError("");
    setPasswordError("");
    setUsernameError("");
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!username.trim()) {
      setUsernameError("Full name cannot be empty.");
      valid = false;
    } else if (!username.includes(" ")) {
      setUsernameError("Please enter your full name (first and last).");
      valid = false;
    } else if (username.length > MAX_USERNAME_LENGTH) {
      setUsernameError(
        `Full name cannot exceed ${MAX_USERNAME_LENGTH} characters.`
      );
      valid = false;
    }
    if (!password || password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    if (!valid) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: username,
      });
      // Alert.alert("Success", "Account created!");
      router.replace("/");
    } catch (error) {
      setPasswordError("Signup Failed: " + error.message);
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
        Create an Account
      </Text>
      <Text style={{ color: "#ccc", fontSize: 15, opacity: 0.5 }}>
        Enter your details to continue.
      </Text>
      <TextInput
        placeholder="Email"
        placeholderTextColor="#999"
        style={[styles.input, { marginTop: 45 }]}
        onChangeText={setEmail}
        value={email}
      />
      {emailError ? (
        <Text
          style={{ color: "red", alignSelf: "flex-start", marginBottom: 4 }}
        >
          {emailError}
        </Text>
      ) : null}
      <TextInput
        placeholder="Full name"
        placeholderTextColor="#999"
        style={styles.input}
        onChangeText={setUsername}
        value={username}
      />
      {usernameError ? (
        <Text
          style={{ color: "red", alignSelf: "flex-start", marginBottom: 4 }}
        >
          {usernameError}
        </Text>
      ) : null}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        onChangeText={setPassword}
        value={password}
      />
      {passwordError ? (
        <Text
          style={{ color: "red", alignSelf: "flex-start", marginBottom: 4 }}
        >
          {passwordError}
        </Text>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={
          !email ||
          !username.trim() ||
          !password ||
          !validateEmail(email) ||
          password.length < 6
        }
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 14 }}
        onPress={() => router.push("/login")}
      >
        <Text style={styles.footerText}>Already have an account? </Text>
        <Text style={{ fontWeight: "bold", color: "#aaa" }}>Sign in</Text>
      </TouchableOpacity>

      <Text style={styles.terms}>
        By creating an account I agree to the Terms of Service & Privacy Policy.
      </Text>
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

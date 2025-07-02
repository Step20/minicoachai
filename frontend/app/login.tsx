// app/login.tsx
import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from "react-native";
import {
  signInWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "expo-router";
import Checkbox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import * as Google from "expo-auth-session/providers/google";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isChecked, setChecked] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async () => {
    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Password cannot be empty.");
      valid = false;
    }
    if (!valid) return;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/");
    } catch (error) {
      setPasswordError("Invalid email or password.");
    }
  };

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "<YOUR_EXPO_CLIENT_ID>",
    iosClientId: "<YOUR_IOS_CLIENT_ID>",
    androidClientId: "<YOUR_ANDROID_CLIENT_ID>",
    webClientId: "<YOUR_WEB_CLIENT_ID>",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => {
          Alert.alert("Success", "Logged in with Google!");
          router.replace("/");
        })
        .catch((error) => {
          Alert.alert("Login Failed", error.message);
        });
    }
  }, [response]);

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/logo-white.png")}
        style={{ width: 125, height: 125, marginBottom: 15 }}
      />
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        Welcome back
      </Text>
      <Text style={{ color: "#ccc", fontSize: 15, opacity: 0.5 }}>
        Please enter your details.
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
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => setChecked(!isChecked)}
        >
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={() => {
              setChecked(!isChecked);
            }}
            color={isChecked ? "#FFB2E3" : undefined}
          />
          <Text style={{ color: "white" }}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/forgot")}>
          <Text style={{ color: "white" }}>Forgot password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.button, { marginTop: 30 }]}
        onPress={handleLogin}
        disabled={!email || !password || !validateEmail(email)}
      >
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
        disabled={!request}
      >
        <Ionicons name="logo-google" size={20} />
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", marginTop: 14 }}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Text style={{ fontWeight: "bold", color: "#aaa" }}>Sign up</Text>
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
  checkbox: {
    margin: 8,
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
  googleButton: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 17,
    alignItems: "center",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
  },
  buttonText: { color: "#17191A", fontWeight: "bold" },
  footerText: { color: "#aaa" },
});

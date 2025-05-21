import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Welcome() {
  const router = useRouter();

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to MiniCoachAI 👋</Text>
      <Text style={styles.sub}>
        Your daily goals, reminders, and AI motivation — all in one place.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 24,
    justifyContent: "center",
  },
  title: { fontSize: 28, fontWeight: "600", color: "#fff", marginBottom: 10 },
  sub: { fontSize: 16, color: "#bbb", marginBottom: 40 },
  button: {
    backgroundColor: "#FFB2E3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "500", color: "#000" },
});

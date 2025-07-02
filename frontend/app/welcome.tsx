// app/welcome.tsx
import { useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Welcome() {
  const router = useRouter();

  const handleContinue = async () => {
    await AsyncStorage.setItem("hasSeenIntro", "true");
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/logo-white.png")}
        style={{ width: 150, height: 150 }}
      />
      <Text style={styles.logo}>MiniCoachAI</Text>

      <Text style={styles.heading}>
        Your new way to keep up in life. Get your coach!
      </Text>
      <Text style={styles.subtext}>
        Before you start look at the new updates from the devs
      </Text>

      <TouchableOpacity onPress={handleContinue} style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
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
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
  logo: { fontSize: 25, color: "#fff", fontWeight: "bold", marginBottom: 20 },
  heading: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
    marginTop: 100,
    width: "70%",
  },
  subtext: {
    color: "#ccc",
    opacity: 0.5,
    textAlign: "center",
    marginBottom: 30,
    fontSize: 19,
    fontWeight: "300",
    width: "75%",
  },
  button: {
    backgroundColor: "#FFB2E3",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    bottom: 35,
    width: "90%",
    position: "absolute",
  },
  buttonText: { color: "#17191A", fontWeight: "bold", fontSize: 20 },
});

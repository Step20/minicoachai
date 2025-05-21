import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/welcome");
    }, 1500); // 1.5s delay
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MiniCoachAI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  logo: { color: "#fff", fontSize: 32, fontWeight: "bold" },
});

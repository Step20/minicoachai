// app/splash.tsx,
import { useEffect, useState } from "react";
import { Image, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useState(new Animated.Value(1))[0];

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(async () => {
        const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
        onAuthStateChanged(auth, (user) => {
          if (user) router.replace("/");
          else if (!hasSeenIntro) router.replace("/welcome");
          else router.replace("/login");
        });
      }, 800);
    });
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Image
        resizeMode="contain"
        source={require("../assets/images/logo-black.png")}
        style={{ width: 150, height: 150 }}
      />
      <Text style={styles.logo}>MiniCoachAI</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB2E3",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: { fontSize: 32, fontWeight: "bold", color: "#000" },
});

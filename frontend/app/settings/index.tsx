import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderTopBack from "@/components/HeaderTopBack";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen() {
  const router = useRouter();

  const menu = [
    "Account",
    "Notifications",
    "Theme",
    "Feedback",
    "Rate App",
    "Support",
    "Privacy Policy",
    "Terms of Use",
    "About Us",
    "Log Out",
  ];

  const mapMenuToScreen = (menuItem: string) => {
    const menuMap: Record<string, string> = {
      Account: "account",
      Notifications: "notifications",
      Theme: "theme",
      Feedback: "feedback",
      "Rate App": "rate",
      Support: "support",
      "Privacy Policy": "privacy",
      "Terms of Use": "terms",
      "About Us": "about",
      "Log Out": "log-out",
    };
    return menuMap[menuItem] || "";
  };

  const navigateScreen = async (screen: string) => {
    if (screen === "Log Out") {
      try {
        await signOut(auth);
        await AsyncStorage.removeItem("user");
        router.replace("/login");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    } else {
      router.push(`/settings/${mapMenuToScreen(screen)}`);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Settings" />

      {menu.map((item, index) => (
        <TouchableOpacity
          onPress={() => navigateScreen(item)}
          key={index}
          style={styles.item}
        >
          <Text style={styles.label}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F", padding: 24 },
  item: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#222",
  },
  label: { color: "#fff", fontSize: 16 },
});

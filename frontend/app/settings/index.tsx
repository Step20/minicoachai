import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import HeaderTopBack from "@/components/HeaderTopBack";

export default function SettingsScreen() {
  const router = useRouter();

  const menu = [
    "Account",
    "Theme",
    "Feedback",
    "Rate App",
    "Support",
    "Privacy Policy",
    "Terms of Use",
    "About Us",
    "Log Out",
  ];

  return (
    <View style={styles.container}>
      <HeaderTopBack title="Settings" />

      {menu.map((item, index) => (
        <TouchableOpacity key={index} style={styles.item}>
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

import HeaderTopBack from "@/components/HeaderTopBack";
import React from "react";
import { View, Text, ScrollView, StyleSheet, Platform } from "react-native";

export default function AboutUsScreen() {
  return (
    <ScrollView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="About Us" screen={"/settings"} />
      <Text style={styles.paragraph}>
        MiniCoachAI is your personal micro-coach designed to help you build
        lasting habits, track goals, and stay motivated with smart nudges and
        encouragement.
      </Text>
      <Text style={styles.paragraph}>
        Our mission is to make personal growth simple, engaging, and accessible.
        We blend behavioral science with AI to guide your everyday actions
        toward bigger results.
      </Text>
      <Text style={styles.paragraph}>
        Whether you're aiming for fitness, focus, mindfulness, or productivity —
        MiniCoachAI helps you stick to it, one step at a time.
      </Text>
      <Text style={styles.paragraph}>
        🚀 Founded in 2025 and built with love, dedication, and a desire to help
        people grow.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#0F0F0F" },
  title: { fontSize: 24, color: "#fff", fontWeight: "bold", marginBottom: 16 },
  paragraph: { fontSize: 15, color: "#ccc", marginBottom: 12, lineHeight: 22 },
});

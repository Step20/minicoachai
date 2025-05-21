import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotificationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notifications</Text>
      <Text style={styles.sub}>
        Upcoming goal/task alerts, coach messages, and more will appear here.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 24 },
  heading: { fontSize: 20, color: "#fff", marginBottom: 10 },
  sub: { fontSize: 14, color: "#ccc" },
});

// components/CoachDetailsSheet.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function CoachDetailsSheet({ coach }) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>{coach.name}</Text>
      <Text>Linked Goals: 2</Text>
      <Text>Personality: Tough Love</Text>
      <Button title="Set as Default Coach" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: { padding: 20, backgroundColor: "#222", borderRadius: 16 },
  title: { color: "#fff", fontSize: 20, marginBottom: 10 },
});

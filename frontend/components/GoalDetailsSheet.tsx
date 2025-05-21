// components/GoalDetailsSheet.tsx
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

export default function GoalDetailsSheet({ goal }) {
  return (
    <View style={styles.sheet}>
      <Text style={styles.title}>{goal.title}</Text>
      <Text>Coach: {goal.coach}</Text>
      <Text>Streak: {goal.streak} days</Text>
      <Text>Progress: {goal.progress}%</Text>
      <Button title="Mark Today Complete" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: { padding: 20, backgroundColor: "#17191A", borderRadius: 16 },
  title: { color: "#fff", fontSize: 20, marginBottom: 10 },
});

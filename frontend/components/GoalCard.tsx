import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GoalCard({ goal }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{goal.title}</Text>
      <Text style={styles.sub}>🔥 {goal.streak}-day streak</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 12, backgroundColor: '#17191A', borderRadius: 18, marginRight: 7, height: 110, width: 165 },
  title: { color: '#fff', fontSize: 16 },
  sub: { color: '#ccc', fontSize: 12 }
});

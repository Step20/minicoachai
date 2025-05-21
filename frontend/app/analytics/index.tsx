import HeaderTopBack from "@/components/HeaderTopBack";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function AnalyticsScreen() {
  return (
    <ScrollView style={styles.container}>
      <HeaderTopBack title="Analytics" />

      <View style={styles.grid}>
        <View style={[styles.card, { width: "100%" }]}>
          <Text style={styles.title}>Your Activity</Text>
          <Text style={styles.value}>Graph placeholder</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Total Tasks</Text>
          <Text style={styles.value}>60 Tasks</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Completed</Text>
          <Text style={styles.value}>43/60</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Missed</Text>
          <Text style={styles.value}>17</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>On Time</Text>
          <Text style={styles.value}>29</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F0F0F", padding: 16 },
  heading: { fontSize: 20, color: "#fff", marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  card: {
    width: "48%",
    backgroundColor: "#17191A",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
  },
  title: { color: "#ccc", fontSize: 14, marginBottom: 6 },
  value: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

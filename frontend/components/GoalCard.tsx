import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // for checkmark
import { Goal } from "@/constants/types";

export default function GoalCard({
  goal,
  progress,
}: {
  goal: Goal;
  progress: number;
}) {
  const progressPercent = (progress / goal.goalNumber || 0) * 100;
  const capitalize = (str: string) =>
    str?.charAt(0).toUpperCase() + str?.slice(1);
  return (
    <View style={styles.card}>
      {/* Header: Icon + optional streak */}
      <View style={styles.headerRow}>
        <View style={styles.emojiCircle}>
          <Text style={styles.emoji}>{goal.goalIcon || "📘"}</Text>
        </View>
        {goal.streaks ? (
          <Text style={styles.streak}>🔥 {goal.streaks}-day</Text>
        ) : null}
      </View>

      {/* Title */}
      <Text style={styles.title}>{goal.title}</Text>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              backgroundColor:
                progress === goal.goalNumber ? "#FFB2E3" : "#fff",
              width: `${progressPercent}%`,
            },
          ]}
        />
      </View>

      {/* Bottom Row: Sub info + check */}
      <View style={styles.bottomRow}>
        <Text style={styles.sub}>
          {goal.goalNumber || 0} {capitalize(goal.goalName) || "Tasks"}
        </Text>
        {progress === goal.goalNumber ? (
          <Ionicons name="checkmark-circle" size={20} color="#94D78A" />
        ) : (
          <Ionicons name="checkmark-circle" size={20} color="#5D5F60" />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 11,
    backgroundColor: "#17191A",
    borderRadius: 18,
    marginRight: 7,
    height: 120,
    width: 165,
    justifyContent: "space-between",
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  emojiCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  emoji: {
    fontSize: 15,
  },
  streak: {
    fontSize: 10,
    color: "#FFB2E3",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    marginTop: 4,
  },
  progressBar: {
    height: 5,
    backgroundColor: "#333",
    borderRadius: 5,
    marginTop: 8,
    marginBottom: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: 5,
    backgroundColor: "#fff",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sub: {
    fontSize: 10,
    color: "#5D5F60",
  },
});

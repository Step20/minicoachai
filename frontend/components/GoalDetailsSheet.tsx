// components/GoalDetailsSheet.tsx
import { Goal } from "@/constants/types";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function GoalDetailsSheet({
  goal,
  progress,
  onUpdateProgress,
}: {
  goal: Goal;
  progress: number;
  onUpdateProgress: (goalId: string, newProgress: number) => void;
}) {
  const [analyticsTitle, setAnalyticsTitle] = useState("Weekly");
  const [currentProgress, setCurrentProgress] = useState(progress);
  const progressPercent = Math.min(
    100,
    (currentProgress / goal.goalNumber) * 100
  );

  useEffect(() => {
    setCurrentProgress(progress);
  }, [progress]);

  const handleSetProgress = (newValue: number) => {
    setCurrentProgress(newValue);
    onUpdateProgress(goal.id, newValue);
  };

  return (
    <View style={styles.sheet}>
      <View
        style={[
          styles.row,
          { justifyContent: "space-between", marginBottom: 3 },
        ]}
      >
        <View style={styles.row}>
          <Text
            style={[
              styles.title,
              styles.emojiCircle,
              { fontSize: 22, marginRight: 10 },
            ]}
          >
            {goal.goalIcon}
          </Text>
          <View>
            <Text style={styles.title}>{goal.title}</Text>
            <View style={[styles.row, { gap: 20, marginTop: 3 }]}>
              <Text style={{ color: "#7A7B7B", fontSize: 13 }}>
                Do {goal.goalNumber} {goal.goalName} a day
              </Text>
              <View style={[styles.row, { gap: 5 }]}>
                <Ionicons name="calendar" size={13} color="#7A7B7B" />
                <Text style={{ color: "#7A7B7B", fontSize: 11 }}>
                  {goal.startDate
                    ? new Date(goal.startDate).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : goal.frequency}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleSetProgress(goal.goalNumber)}>
          {currentProgress === goal.goalNumber ? (
            <Ionicons name="checkmark-circle" size={42} color="#94D78A" />
          ) : (
            <Ionicons name="checkmark-circle" size={42} color="#5D5F60" />
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.row, { gap: 8, marginTop: 10 }]}>
        {goal.frequency === "Daily" ? (
          <Text style={styles.tag}>{goal.frequency}</Text>
        ) : null}
        <Text style={styles.tag}>{goal.coach?.name} Coach</Text>
        {goal.streaks > 0 ? (
          <Text style={styles.streakTag}>🔥 {goal.streaks}-week streak</Text>
        ) : null}
      </View>
      <View style={styles.incrementRow}>
        <TouchableOpacity
          onPress={() => handleSetProgress(Math.max(0, currentProgress - 1))}
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: currentProgress === 0 ? "#282C2D" : "#fff",
            }}
          >
            -
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={{ fontSize: 35, fontWeight: "bold", color: "#fff" }}>
            {currentProgress}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={currentProgress >= goal.goalNumber}
          onPress={() =>
            handleSetProgress(Math.min(goal.goalNumber, currentProgress + 1))
          }
        >
          <Text
            style={{
              fontSize: 25,
              fontWeight: "bold",
              color: currentProgress === goal.goalNumber ? "#282C2D" : "#fff",
            }}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercent}%` }]}
          />
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <Text style={styles.text}>Total Progress</Text>
          <Text style={styles.text}>{`${Math.round(
            progressPercent
          )}% Complete`}</Text>
        </View>
      </View>

      <View style={styles.analyticsBox}>
        <View style={[styles.row, { gap: 1 }]}>
          {["Weekly", "Monthly", "Yearly"].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setAnalyticsTitle(f)}
              style={[
                styles.freqBtn,
                analyticsTitle === f && styles.freqBtnSelected,
              ]}
            >
              <Text
                style={[
                  styles.freqText,
                  analyticsTitle === f && styles.freqTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  freqBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  freqBtnSelected: {
    backgroundColor: "#666969",
  },
  freqText: {
    fontSize: 11,
    color: "#898B8C",
  },
  freqTextActive: {
    color: "#fff",
    fontWeight: "700",
  },
  incrementRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 35,
    marginBottom: 18,
    borderColor: "#282C2D",
    borderWidth: 2,
    borderRadius: 40,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  analyticsBox: {
    backgroundColor: "#282C2D",
    padding: 15,
    borderRadius: 30,
    marginTop: 45,
    height: 250,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 5,

    marginBottom: 4,
    overflow: "hidden",
  },
  text: {
    color: "#7A7B7B",
    fontSize: 13,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#FFB2E3",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  emojiCircle: {
    padding: 10,
    borderRadius: 100,
    backgroundColor: "#222222",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  streakTag: {
    backgroundColor: "#FFB2E3",
    color: "#17191A",
    fontWeight: "bold",
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  tag: {
    backgroundColor: "#2C2F32",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 11,
  },
  sheet: { backgroundColor: "#17191A", borderRadius: 16 },
  title: { color: "#fff", fontSize: 30, fontWeight: "900" },
});

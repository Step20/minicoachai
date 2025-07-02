// app/goals/index.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import GoalDetailsSheet from "@/components/GoalDetailsSheet";
import HeaderTopBack from "@/components/HeaderTopBack";
import { Ionicons } from "@expo/vector-icons";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { Goal } from "@/constants/types";
import { onAuthStateChanged } from "@firebase/auth";

const goals = [
  {
    id: "1",
    title: "Reading",
    streak: 15,
    startDate: "2025-05-28",
    endDate: "2025-05-30",
    type: "Range", // range goal
    emoji: "📚",
    progress: 1,
    amount: 5, // 5 books
    goalNumber: 5,
    goalName: "books",
    coach: "📖 Reading Sage",
  },
  {
    id: "2",
    title: "Fitness",
    streak: 10,
    startDate: "2025-05-28",
    type: "Daily",
    endDate: null, // daily goal
    emoji: "🏋️",
    progress: 0.6, // 80% progress
    goalNumber: 3, // 3 workouts
    goalName: "workouts",
    coach: "🏋 Fitness Guru",
  },
  {
    id: "3",
    title: "Meditation",
    streak: 10,
    startDate: "2025-05-29",
    endDate: "2025-06-30",
    type: "Range", // range goal
    emoji: "🧘",
    progress: 0.2, // 20% progress
    goalNumber: 10,
    goalName: "minutes",
    coach: "🧘‍♀️ Zen Master",
  },
];

export default function AllGoals() {
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const openGoalSheet = (goal: Goal) => {
    setSelectedGoal(goal);
    sheetRef.current?.expand();
  };

  const onUpdateGoalProgress = async (goalId: string, newProgress: number) => {
    try {
      if (!user) return;
      const goalRef = doc(db, "users", user.uid, "goals", goalId);
      await updateDoc(goalRef, {
        [`progressByDate.${selectedDate}`]: newProgress,
      });
    } catch (error) {
      console.error("Error updating goal progress:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title={"All goals"} />
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openGoalSheet(item)}
          >
            <View>
              <View style={styles.row}>
                <Text
                  style={[
                    styles.title,
                    styles.emojiCircle,
                    { fontSize: 22, marginRight: 10 },
                  ]}
                >
                  {item.emoji}
                </Text>
                <View style={{ flex: 1 }}>
                  <View
                    style={[styles.row, { justifyContent: "space-between" }]}
                  >
                    <Text style={styles.title}>{item.title}</Text>
                    {/* Display the number of days left if it's a range goal */}
                    {item.type === "Range" && item.endDate ? (
                      <Text style={styles.streakTag}>
                        {Math.ceil(
                          (new Date(item.endDate).getTime() -
                            new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )}{" "}
                        days left
                      </Text>
                    ) : null}
                  </View>

                  <View style={[styles.row, { gap: 20 }]}>
                    <Text style={{ color: "#7A7B7B", fontSize: 13 }}>
                      Do {item.goalNumber} {item.goalName} a day
                    </Text>
                  </View>
                </View>
              </View>
              <View style={[styles.row, { gap: 8, marginTop: 12 }]}>
                {item.type === "Daily" ? (
                  <Text style={styles.tag}>{item.type}</Text>
                ) : null}
                <Text style={styles.tag}>{item.coach} Coach</Text>
                {item.streak > 0 ? (
                  <Text style={styles.streakTag}>
                    🔥 {item.streak}-week streak
                  </Text>
                ) : null}
              </View>

              <View>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${item.progress * 100}%` },
                    ]}
                  />
                </View>
                <View style={[styles.row, { justifyContent: "space-between" }]}>
                  <Text style={styles.text}>Total Progress</Text>
                  <Text style={styles.text}>
                    {Math.round(item.progress * 100)}% Complete
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <BottomSheet
        backgroundStyle={{
          backgroundColor: "#17191A",
        }}
        backdropComponent={({ style }) =>
          sheetIndex >= 0 ? (
            <View style={[style, { backgroundColor: "rgba(0, 0, 0, 0.7)" }]} />
          ) : null
        }
        onChange={(index) => setSheetIndex(index)}
        enableDynamicSizing={false}
        enablePanDownToClose
        ref={sheetRef}
        index={-1}
        snapPoints={["70%"]}
      >
        <BottomSheetView style={{ flex: 1, padding: 20, height: "100%" }}>
          {selectedGoal && (
            <GoalDetailsSheet
              goal={selectedGoal}
              progress={selectedGoal.progressByDate?.[selectedDate] || 0}
              onUpdateProgress={onUpdateGoalProgress}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    height: 8,
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 4,
    marginTop: 20,
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
    fontWeight: "900",
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
  container: { flex: 1, padding: 20, backgroundColor: "#0F0F0F" },
  card: {
    padding: 16,
    backgroundColor: "#17191A",
    borderRadius: 18,
    marginBottom: 10,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  sub: { color: "#ccc", fontSize: 14 },
});

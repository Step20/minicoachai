// app/goals/index.tsx
import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import GoalDetailsSheet from "@/components/GoalDetailsSheet";
import HeaderTopBack from "@/components/HeaderTopBack";

const goals = [
  {
    id: "1",
    title: "Fitness Goal",
    coach: "Fitness Guru",
    streak: 14,
    progress: 45,
  },
  {
    id: "2",
    title: "Reading Goal",
    coach: "Tough Love",
    streak: 5,
    progress: 80,
  },
];

export default function AllGoals() {
  const router = useRouter();
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [sheetIndex, setSheetIndex] = useState(-1);

  const openGoalSheet = (goal) => {
    setSelectedGoal(goal);
    sheetRef.current?.expand();
  };

  return (
    <View style={styles.container}>
      <HeaderTopBack title={"All goals"} />
      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => openGoalSheet(item)}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.sub}>Coach: {item.coach}</Text>
            <Text style={styles.sub}>🔥 {item.streak}-day streak</Text>
            <Text style={styles.sub}>Progress: {item.progress}%</Text>
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
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {selectedGoal && <GoalDetailsSheet goal={selectedGoal} />}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#0F0F0F" },
  card: {
    padding: 16,
    backgroundColor: "#17191A",
    borderRadius: 10,
    marginBottom: 10,
  },
  title: { color: "#fff", fontSize: 18 },
  sub: { color: "#ccc", fontSize: 14 },
});

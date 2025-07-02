// app/coaches/index.tsx
import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderTopBack from "@/components/HeaderTopBack";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CoachDetailsSheet from "@/components/CoachDetailsSheet";

const coaches = [
  {
    id: "1",
    name: "🏋 Fitness Guru",
    active: true,
    linkedGoals: [
      { id: "1", title: "Workout", progress: 0.8, nudgeFrequency: "Daily" },
      { id: "2", title: "Nutrition", progress: 0.6, nudgeFrequency: "Weekly" },
    ],
    description:
      "This coach specializes in fitness and nutrition, helping you achieve your health goals with personalized plans.",
  },
  {
    id: "2",
    name: "📖 Reading Sage",
    active: false,
    description:
      "This coach is here to push you beyond your limits with a tough love approach, ensuring you stay on track with your goals.",
  },
  {
    id: "3",
    name: "🧘 Zen Master",
    active: true,
    linkedGoals: [
      { id: "1", title: "Meditation", progress: 0.5, nudgeFrequency: "Daily" },
    ],
    description:
      "This coach focuses on mindfulness and meditation, guiding you to achieve mental clarity and peace.",
  },
  {
    id: "4",
    name: "🎨 Creative Coach",
    active: true,
    linkedGoals: [
      {
        id: "1",
        title: "Art Project",
        progress: 0.3,
        nudgeFrequency: "Weekly",
      },
    ],
    description:
      "This coach inspires creativity and helps you unleash your artistic potential with innovative techniques.",
  },
  {
    id: "5",
    name: "💼 Career Mentor",
    active: false,
    description:
      "This coach provides career guidance and mentorship, helping you navigate your professional journey with confidence.",
  },
  {
    id: "6",
    name: "🌱 Wellness Coach",
    active: true,
    linkedGoals: [
      {
        id: "1",
        title: "Healthy Eating",
        progress: 0.7,
        nudgeFrequency: "Daily",
      },
    ],
    description:
      "This coach focuses on holistic wellness, guiding you to achieve balance in your physical and mental health.",
  },
];

export default function Coaches() {
  const router = useRouter();
  const [sheetIndex, setSheetIndex] = useState(-1);
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedCoach, setSelectedCoach] = useState(null);
  const [numColumns, setNumColumns] = React.useState(2);

  const openCoachSheet = (coach) => {
    setSelectedCoach(coach);
    sheetRef.current?.expand();
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      <HeaderTopBack title="Coaches" />
      <View>
        <FlatList
          data={coaches}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => openCoachSheet(item)}
            >
              <View
                style={{
                  backgroundColor: "#000",
                  borderRadius: 10,
                  paddingVertical: 40,
                }}
              ></View>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>
                {item.linkedGoals?.length} {item.active ? "Active" : "Inactive"}{" "}
                Goal{(item.linkedGoals?.length ?? 0) > 1 ? "s" : ""}
              </Text>
              <TouchableOpacity
                style={[
                  styles.button,
                  !item.active && { backgroundColor: "#7A7B7B" },
                ]}
              >
                <Text style={[styles.text, !item.active && { color: "#fff" }]}>
                  {item.active ? "View Details" : "Activate Coach"}
                </Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
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
          {selectedCoach && <CoachDetailsSheet coach={selectedCoach} />}
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#0F0F0F",
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#FFB2E3",
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    marginTop: 20,
  },
  container: { flex: 1, padding: 20, backgroundColor: "#0F0F0F" },
  card: {
    padding: 8,
    backgroundColor: "#17191A",
    borderRadius: 15,
    marginBottom: 10,
    width: "49%", // Adjust as needed for columns
    height: 195, // Adjust as needed for rows
  },
  title: { color: "#fff", fontSize: 16, fontWeight: "bold", marginTop: 5 },
  sub: { color: "#7A7B7B", fontSize: 14, marginTop: 4 },
});

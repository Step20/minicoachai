// app/coaches/index.tsx
import React, { useRef, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import HeaderTopBack from "@/components/HeaderTopBack";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import CoachDetailsSheet from "@/components/CoachDetailsSheet";

const coaches = [
  { id: "1", name: "Fitness Guru", active: true },
  { id: "2", name: "Tough Love", active: false },
  { id: "3", name: "Mindfulness Coach", active: true },
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
    <View style={styles.container}>
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
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.sub}>
                {item.active ? "Active" : "Inactive"}
              </Text>
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
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {selectedCoach && <CoachDetailsSheet coach={selectedCoach} />}
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
    width: "49%", // Adjust as needed for columns
    height: 150, // Adjust as needed for rows
  },
  title: { color: "#fff", fontSize: 18 },
  sub: { color: "#ccc", fontSize: 14 },
});

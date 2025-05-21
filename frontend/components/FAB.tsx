import React, { useRef, useState, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import CreateEntryModal from "@/components/CreateEntryModal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function FAB() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetType, setSheetType] = useState("task");
  const [sheetIndex, setSheetIndex] = useState(-1);

  const openSheet = (type: "task" | "goal") => {
    setSheetType(type);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <TouchableOpacity style={styles.fab} onPress={() => openSheet("task")}>
        <Text style={styles.text}>＋</Text>
      </TouchableOpacity>

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
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["70%"]}
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          <CreateEntryModal
            type={sheetType}
            onCreate={() => bottomSheetRef.current?.close()}
          />
        </BottomSheetView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#FFB2E3",
    borderRadius: 100,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  text: { fontSize: 20, color: "#000" },
});

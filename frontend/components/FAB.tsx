import React, { useRef, useState, useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import CreateEntryModal from "@/components/CreateEntryModal";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

export default function FAB() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const modalRef = useRef(null); // <-- add this
  const [sheetType, setSheetType] = useState("task");
  const [sheetIndex, setSheetIndex] = useState(-1);

  const openSheet = (createType: "task" | "goal") => {
    setSheetType(createType);
    bottomSheetRef.current?.expand();
  };

  const handleCreate = (entry: any) => {
    bottomSheetRef.current?.close(); // close modal
  };

  // Reset form when sheet closes
  const handleSheetChange = (index: number) => {
    setSheetIndex(index);
    if (index === -1 && modalRef.current) {
      modalRef.current.resetForm();
    }
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
        onChange={handleSheetChange}
        enableDynamicSizing={false}
        enablePanDownToClose
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["70%"]}
      >
        <BottomSheetView style={{ flex: 1, padding: 20, height: "100%" }}>
          <CreateEntryModal ref={modalRef} onCreate={handleCreate} />
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

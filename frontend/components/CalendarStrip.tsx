import React, { useEffect, useRef } from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  selectedDate: string;
  onSelectDate: (date: string) => void;
};

export default function CalendarStrip({ selectedDate, onSelectDate }: Props) {
  const flatListRef = useRef<FlatList>(null);

  const today = new Date();
  const todayDateISO = today.toISOString().split("T")[0];

  // Build 7 days of current week (Sun to Sat)
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay()); // Sunday

  const currentWeek = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  // Add 3 more days after the current week (total 10)
  const extendedDates = [
    ...currentWeek,
    ...Array.from({ length: 3 }, (_, i) => {
      const date = new Date(currentWeek[6]);
      date.setDate(date.getDate() + i + 1);
      return date;
    }),
  ];

  // Scroll to current day on mount
  useEffect(() => {
    const index = extendedDates.findIndex(
      (d) => d.toISOString().split("T")[0] === todayDateISO
    );

    setTimeout(() => {
      flatListRef.current?.scrollToIndex({
        index,
        animated: true,
      });
    }, 0);
  }, []);

  const handleDatePress = (date: string, index: number) => {
    onSelectDate(date);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={extendedDates}
      style={{ flexGrow: 0, paddingBottom: 15 }}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.toISOString().split("T")[0]}
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item, index }) => {
        const isoDate = item.toISOString().split("T")[0];
        const isSelected = isoDate === selectedDate;
        const dayNum = item.getDate();
        const weekday = item.toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <TouchableOpacity
            style={[styles.dateItem, isSelected && styles.selected]}
            onPress={() => handleDatePress(isoDate, index)}
          >
            <Text style={[styles.dayNum, isSelected && styles.selectedText]}>
              {dayNum}
            </Text>
            <Text
              style={[
                styles.weekday,
                isSelected && styles.selectedText,
                { opacity: isSelected ? 1 : 0.5 },
              ]}
            >
              {weekday.toUpperCase()}
            </Text>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  dateItem: {
    marginRight: 11,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 100,
    backgroundColor: "#17191A",
  },
  selected: {
    backgroundColor: "#FFB2E3",
  },
  selectedText: {
    color: "#17191A",
    fontWeight: "bold",
  },
  dayNum: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },
  weekday: {
    fontSize: 16,
    color: "#ccc",
  },
});

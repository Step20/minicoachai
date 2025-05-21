// components/CalendarStrip.tsx
import React from "react";
import { FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function CalendarStrip({ selectedDate, onSelectDate }) {
  const today = new Date();
  const dates = [...Array(5)].map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  return (
    <FlatList
      horizontal
      data={dates}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item}
      style={{
        flexGrow: 0,
        paddingBottom: 15,
      }}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={[styles.dateItem, item === selectedDate && styles.selected]}
          onPress={() => onSelectDate(item)}
        >
          <Text style={[styles.text,  item === selectedDate && styles.selectedText]}>{item.slice(5)}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  dateItem: {
    padding: 10,
    margin: 4,
    marginRight: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: 89,
    height:89,
    borderRadius: 100,
    backgroundColor: "#17191A",
  },
  selected: { backgroundColor: "#FFB2E3" },
  selectedText: {color: "#17191A", fontWeight: 900 },
  text: { color: "#fff", fontWeight: 500  },
});

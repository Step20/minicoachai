import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";

export default function TaskChecklist({ tasks }) {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      {tasks.map((task) => (
        <TouchableOpacity key={task.id} style={styles.row}>
          <Checkbox
            style={styles.checkbox}
            value={task.completed}
            onValueChange={() => {
              task.completed = !task.completed;
              setChecked(!isChecked);
            }}
            color={task.completed ? "#FFB2E3" : undefined}
          />

          <Text style={[styles.text, task.completed && styles.completed]}>
            {task.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#17191A",
    marginRight: 10,
    padding: 15,
    borderRadius: 20,
  },
  row: { marginBottom: 10, flexDirection: "row", alignItems: "center" },
  text: { color: "#fff", fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "#aaa" },
  checkbox: {
    margin: 8,
  },
});

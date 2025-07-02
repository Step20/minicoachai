import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Task,
} from "react-native";
import Checkbox from "expo-checkbox";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

export default function TaskChecklist({ tasks, onDeleteTask, onToggleTask }) {
  return (
    <View style={styles.container}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Swipeable
            key={task.id}
            renderRightActions={(_, dragX) => {
              const scale = dragX.interpolate({
                inputRange: [-80, 0],
                outputRange: [1, 0],
                extrapolate: "clamp",
              });
              return (
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => onDeleteTask(task.id)}
                >
                  <Animated.View style={{ transform: [{ scale }] }}>
                    <Ionicons name="trash" size={28} color="#fff" />
                  </Animated.View>
                </TouchableOpacity>
              );
            }}
            overshootRight={false}
          >
            <TouchableOpacity style={styles.row}>
              <Checkbox
                style={styles.checkbox}
                value={task.completed}
                onValueChange={() => onToggleTask(task.id)}
                color={task.completed ? "#FFB2E3" : undefined}
              />
              <Text style={[styles.text, task.completed && styles.completed]}>
                {task.title}
              </Text>
            </TouchableOpacity>
          </Swipeable>
        ))
      ) : (
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            opacity: 0.7,
            fontStyle: "italic",
          }}
        >
          ✍️ Create your first task!
        </Text>
      )}
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
  row: { gap: 20, flexDirection: "row", alignItems: "center" },
  text: { color: "#fff", fontSize: 16 },
  completed: { textDecorationLine: "line-through", color: "#aaa" },
  checkbox: {
    margin: 8,
  },
  deleteButton: {
    backgroundColor: "#ff3b30",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: "90%",
    borderRadius: 15,
    marginVertical: 5,
  },
});

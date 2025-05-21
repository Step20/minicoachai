import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import CalendarStrip from "../components/CalendarStrip";
import GoalCard from "../components/GoalCard";
import TaskChecklist from "../components/TaskChecklist";
import FAB from "../components/FAB";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // Dummy data
  const goals = [
    { id: "1", title: "Reading", streak: 15 },
    { id: "2", title: "Fitness", streak: 10 },
    { id: "3", title: "Fitness", streak: 10 },
  ];
  const tasks = [
    { id: "1", title: "buy groceries", completed: false },
    { id: "2", title: "return book", completed: true },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <Text style={styles.h2}>Good evening,</Text>
          <Text style={styles.h1}>Armand</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.avatar}
        ></TouchableOpacity>
      </View>
      <CalendarStrip
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
      <Text style={styles.section}>goal trackers</Text>
      <FlatList
        data={goals}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <GoalCard goal={item} />}
        contentContainerStyle={styles.goalList}
        style={{
          flexGrow: 0,
        }}
      />
      <Text style={styles.section}>things to do</Text>
      <TaskChecklist tasks={tasks} />
      <FAB />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 11,
    backgroundColor: "#0F0F0F",
  },
  section: {
    color: "#fff",
    fontSize: 22,
    marginVertical: 10,
    marginLeft: 20,
    fontWeight: "600",
  },
  goalList: { paddingBottom: 30 },
  heading: {
    display: "flex",
    paddingRight: 20,
    paddingLeft: 9,
    paddingBottom: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  avatar: { backgroundColor: "white", width: 58, height: 58, borderRadius: 15 },
  h1: { fontSize: 26, color: "white", fontWeight: "800" },
  h2: { fontSize: 22, color: "white", opacity: 0.7, letterSpacing: 1 },
});

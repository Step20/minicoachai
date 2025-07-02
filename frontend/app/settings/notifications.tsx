import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderTopBack from "@/components/HeaderTopBack";

export default function NotificationSettingsScreen() {
  const navigation = useNavigation();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [dailyReminders, setDailyReminders] = useState(true);
  const [goalUpdates, setGoalUpdates] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios"); // iOS keeps picker open
    if (selectedTime) setReminderTime(selectedTime);
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 30 },
      ]}
    >
      {/* Header */}
      <HeaderTopBack title="Notifications" screen={"/settings"} />

      {/* Notification Toggles */}
      <View style={styles.row}>
        <Text style={styles.label}>Enable Push Notifications</Text>
        <Switch
          value={pushEnabled}
          onValueChange={setPushEnabled}
          trackColor={{ false: "#444", true: "#FFB2E3" }}
          thumbColor={pushEnabled ? "#fff" : "#ccc"}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Daily Reminder</Text>
        <Switch
          value={dailyReminders}
          onValueChange={setDailyReminders}
          trackColor={{ false: "#444", true: "#FFB2E3" }}
          thumbColor={dailyReminders ? "#fff" : "#ccc"}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Goal Updates</Text>
        <Switch
          value={goalUpdates}
          onValueChange={setGoalUpdates}
          trackColor={{ false: "#444", true: "#FFB2E3" }}
          thumbColor={goalUpdates ? "#fff" : "#ccc"}
        />
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Sound/Vibration</Text>
        <Switch
          value={soundEnabled}
          onValueChange={setSoundEnabled}
          trackColor={{ false: "#444", true: "#FFB2E3" }}
          thumbColor={soundEnabled ? "#fff" : "#ccc"}
        />
      </View>

      {/* Reminder Time Picker */}
      <TouchableOpacity
        onPress={() => setShowTimePicker(true)}
        style={styles.row}
      >
        <Text style={styles.label}>Reminder Time</Text>
        <Text style={styles.timeValue}>
          {reminderTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text>
      </TouchableOpacity>

      {showTimePicker && (
        <DateTimePicker
          value={reminderTime}
          mode="time"
          display="default"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "ios" ? 60 : 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    gap: 10,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#222",
  },
  label: {
    color: "#fff",
    fontSize: 16,
  },
  timeValue: {
    color: "#FFB2E3",
    fontSize: 16,
    fontWeight: "600",
  },
});

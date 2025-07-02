import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Platform,
  ActionSheetIOS,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const allGoals = [
  {
    id: "1",
    title: "Pushups",
    linkedCoachId: "2",
    linkedCoachName: "Zen Master",
  },
  { id: "2", title: "Reading", linkedCoachId: null },
  { id: "3", title: "Sleep", linkedCoachId: null },
  {
    id: "4",
    title: "Yoga",
    linkedCoachId: "1",
    linkedCoachName: "Fitness Guru",
  },
];

const nudgeOptions = ["Daily", "Weekly", "Once a day", "Twice a day"];

export default function CoachDetailsSheet({ coach }) {
  const [goalInput, setGoalInput] = useState("");
  const [nudgeFrequency, setNudgeFrequency] = useState("");
  const [selectedGoalIndex, setSelectedGoalIndex] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [originalGoal, setOriginalGoal] = useState("");
  const [originalNudge, setOriginalNudge] = useState("");

  const handleTagPress = (goal, index) => {
    if (selectedGoalIndex === index) {
      setGoalInput("");
      setOriginalGoal("");
      setNudgeFrequency("");
      setOriginalNudge("");
      setSelectedGoalIndex(null);
      setHasChanges(false);
      return;
    }

    setGoalInput(goal.title);
    setNudgeFrequency(goal.nudgeFrequency || "");
    setOriginalGoal(goal.title);
    setOriginalNudge(goal.nudgeFrequency || "");
    setSelectedGoalIndex(index);
  };

  const handleGoalChange = (title) => {
    const splitTitle = title.split(" ");
    if (splitTitle.length > 1) {
      // If the title has a coach name, split it
      splitTitle[0] = splitTitle[0].trim();
    }
    const selectedGoal = allGoals.find((g) => g.title === splitTitle[0]);
    // If the goal has no coach, just assign it
    if (!selectedGoal?.linkedCoachId) {
      setGoalInput(title);
      return;
    }

    // If the goal is already linked to this coach, allow selection silently
    if (selectedGoal?.linkedCoachId === coach.id) {
      setGoalInput(title);
      return;
    }

    // Otherwise show confirmation to replace coach
    Alert.alert(
      "Replace Coach?",
      `${selectedGoal.title} is already linked to ${selectedGoal.linkedCoachName}. Replace with ${coach.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => setGoalInput(""),
        },
        {
          text: "Replace",
          style: "destructive",
          onPress: () => setGoalInput(title),
        },
      ]
    );
  };

  useEffect(() => {
    const changed =
      goalInput.trim() !== originalGoal.trim() ||
      nudgeFrequency.trim() !== originalNudge.trim();
    setHasChanges(changed);
  }, [goalInput, nudgeFrequency, originalGoal, originalNudge]);

  if (!coach)
    return (
      <View>
        <Text style={{ color: "#fff" }}>No coach selected</Text>
      </View>
    );

  return (
    <View style={styles.sheet}>
      <View style={styles.imagePlaceholder}>
        <Text
          style={[coach.active ? styles.streakTag : styles.tag, styles.absTag]}
        >
          {coach.active ? "Active" : "Inactive"}
        </Text>
      </View>

      <Text style={styles.title}>{coach.name}</Text>
      <Text style={styles.description}>{coach.description}</Text>

      {coach.linkedGoals?.length > 0 ? (
        <>
          <Text style={styles.linkedTitle}>
            {coach.linkedGoals.length} Linked Goal
            {coach.linkedGoals.length > 1 ? "s" : ""}
          </Text>
          <View style={styles.tagRow}>
            {coach.linkedGoals.map((goal, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleTagPress(goal, index)}
              >
                <Text
                  style={[
                    styles.tag,
                    index === selectedGoalIndex && styles.selectedTag,
                  ]}
                >
                  {goal.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.noGoals}>
          No linked goals yet. Link coach to your goals to get started!
        </Text>
      )}
      {/* Goal Picker */}
      <View
        style={[
          styles.pickerContainer,
          {
            height: 50,
            paddingHorizontal: 15,
            justifyContent: "center",
          },
        ]}
      >
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => {
              const options = [
                ...new Set([
                  ...(coach.linkedGoals?.map((g) => g.title) || []),
                  ...allGoals
                    .filter(
                      (g) =>
                        !coach.linkedGoals?.some((lg) => lg.title === g.title)
                    )
                    .map((g) => `${g.title}`),
                ]),
                "Cancel",
              ];

              ActionSheetIOS.showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex: options.length - 1,
                  userInterfaceStyle: "dark",
                },
                (buttonIndex) => {
                  if (buttonIndex < options.length - 1) {
                    handleGoalChange(options[buttonIndex]);
                  }
                }
              );
            }}
            style={styles.picker}
          >
            <Text style={{ color: "#fff" }}>
              {goalInput ||
                (coach.linkedGoals?.length > 0
                  ? "Add another goal"
                  : "Add a linked goal")}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            selectedValue={goalInput || "default"}
            onValueChange={(value) => {
              if (value !== "default") handleGoalChange(value);
            }}
            style={styles.picker}
            dropdownIconColor="#7A7B7B"
          >
            <Picker.Item
              label={
                coach.linkedGoals?.length > 0
                  ? "Add another goal"
                  : "Add a linked goal"
              }
              value="default"
              color="#7A7B7B"
            />
            {[
              ...new Set([...(coach.linkedGoals?.map((g) => g.title) || [])]),
              ...allGoals
                .filter(
                  (g) => !coach.linkedGoals?.some((lg) => lg.title === g.title)
                )
                .map((g) => `${g.title}`),
            ].map((goalTitle, idx) => (
              <Picker.Item key={idx} label={goalTitle} value={goalTitle} />
            ))}
          </Picker>
        )}

        {goalInput !== "" && goalInput !== originalGoal && (
          <TouchableOpacity
            onPress={() => setGoalInput("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle-outline" size={20} color="#FFB2E3" />
          </TouchableOpacity>
        )}
      </View>

      {/* Nudge Picker */}
      <View
        style={[
          styles.pickerContainer,
          {
            height: 50,
            paddingHorizontal: 15,
            justifyContent: "center",
          },
        ]}
      >
        {Platform.OS === "ios" ? (
          <TouchableOpacity
            onPress={() => {
              const options = [...nudgeOptions, "Cancel"];
              ActionSheetIOS.showActionSheetWithOptions(
                {
                  options,
                  cancelButtonIndex: options.length - 1,
                  userInterfaceStyle: "dark",
                },
                (buttonIndex) => {
                  if (buttonIndex < options.length - 1) {
                    setNudgeFrequency(options[buttonIndex]);
                  }
                }
              );
            }}
            style={[styles.picker, { justifyContent: "center" }]}
          >
            <Text style={{ color: "#fff" }}>
              {nudgeFrequency || "Nudge Frequency"}
            </Text>
          </TouchableOpacity>
        ) : (
          <Picker
            selectedValue={nudgeFrequency || "default"}
            onValueChange={(value) => {
              if (value !== "default") setNudgeFrequency(value);
            }}
            style={styles.picker}
            dropdownIconColor="#7A7B7B"
          >
            <Picker.Item
              label="Nudge Frequency"
              value="default"
              color="#7A7B7B"
            />
            {nudgeOptions.map((opt, idx) => (
              <Picker.Item key={idx} label={opt} value={opt} />
            ))}
          </Picker>
        )}

        {nudgeFrequency !== "" && nudgeFrequency !== originalNudge && (
          <TouchableOpacity
            onPress={() => setNudgeFrequency("")}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle-outline" size={20} color="#FFB2E3" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        disabled={!hasChanges}
        style={[styles.saveButton, !hasChanges && styles.disabledSaveButton]}
      >
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    flex: 1,
    backgroundColor: "#17191A",
    borderRadius: 16,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 2,
  },
  imagePlaceholder: {
    backgroundColor: "#000",
    borderRadius: 10,
    paddingVertical: 65,
  },
  description: {
    color: "#7A7B7B",
    fontSize: 13,
    marginBottom: 15,
    lineHeight: 18,
  },
  linkedTitle: {
    color: "#fff",
    fontSize: 13,
    marginBottom: 10,
    fontWeight: "bold",
  },
  tagRow: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  tag: {
    backgroundColor: "#2C2F32",
    color: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
    fontSize: 11,
  },
  selectedTag: {
    backgroundColor: "#FFB2E3",
    color: "#17191A",
    fontWeight: "bold",
  },
  noGoals: {
    color: "#7A7B7B",
    fontSize: 11,
    fontStyle: "italic",
    marginBottom: 10,
    opacity: 0.45,
    textAlign: "center",
  },
  absTag: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1,
  },
  streakTag: {
    backgroundColor: "#FFB2E3",
    color: "#17191A",
    fontWeight: "bold",
    fontSize: 11,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  pickerContainer: {
    marginBottom: 11,
    borderRadius: 100,
    borderColor: "#7A7B7B",
    borderWidth: 1,
    overflow: "hidden",
    position: "relative",
  },
  picker: {
    color: "#fff",
  },
  clearButton: {
    position: "absolute",
    right: 45,
    top: 15,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 14,
    backgroundColor: "#FFB2E3",
    borderRadius: 20,
    position: "absolute",
    bottom: 20,
    width: "100%",
  },
  disabledSaveButton: {
    backgroundColor: "#B07F99",
  },
  saveButtonText: {
    color: "#17191A",
    fontWeight: "bold",
    textAlign: "center",
  },
});

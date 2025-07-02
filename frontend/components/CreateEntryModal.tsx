import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
  FlatList,
  Platform,
  Alert,
  ActionSheetIOS,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { createGoal, createTask } from "@/utils/createEntry";
import { Coach, Goal, Task } from "@/constants/types";
import {
  saveGoalToFirestore,
  saveTaskToFirestore,
} from "@/utils/firebaseUtils";
import { auth } from "@/lib/firebase";
import { Picker } from "@react-native-picker/picker";
import { COACHES } from "@/constants/coaches";

type CreateEntryModalProps = {
  createType?: "task" | "goal";
  onCreate: (entry: Goal | Task) => void;
};

const CreateEntryModal = forwardRef(function CreateEntryModal(
  { createType = "task", onCreate }: CreateEntryModalProps,
  ref
) {
  const [entryType, setEntryType] = useState(createType);
  const [goalNumber, setGoalNumber] = useState<number | "">("");
  const [coach, setCoach] = useState<Coach | undefined>(undefined);
  const [nudgeFrequency, setNudgeFrequency] = useState<number | "">("");
  const [notify, setNotify] = useState(false);
  const [notifyTime, setNotifyTime] = useState("");
  const [goalName, setGoalName] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [frequency, setFrequency] = useState<
    Goal["frequency"] | Task["frequency"]
  >("Daily");
  const [time, setTime] = useState("");
  const [goalIcon, setGoalIcon] = useState("💪");
  const [iconIndex, setIconIndex] = useState(0);
  const [iconModalVisible, setIconModalVisible] = useState(false);
  const [iconSelected, setIconSelected] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const arrGoalIcons = [
    "💪",
    "📚",
    "🏋️",
    "🧘",
    "🎨",
    "🎯",
    "🚴",
    "🏃‍♂️",
    "🧗‍♀️",
    "🏊‍♂️",
  ];

  const timeOptions = Array.from({ length: 96 }, (_, i) =>
    new Date(0, 0, 0, 0, i * 15).toTimeString().slice(0, 5)
  );
  // Cycle through icons every 2 seconds
  useEffect(() => {
    if (iconModalVisible || iconSelected) return;
    const interval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % arrGoalIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [arrGoalIcons.length, iconModalVisible, iconSelected]);

  useEffect(() => {
    setGoalIcon(arrGoalIcons[iconIndex]);
  }, [arrGoalIcons, iconIndex]);

  const resetForm = () => {
    setCoach(undefined);
    setGoalIcon("");
    setGoalName("");
    setGoalTitle("");
    setTaskTitle("");
    setNotify(false);
    setNotifyTime("");
    setGoalNumber("");
    setNudgeFrequency("");
    setFrequency("Daily");
    setIconSelected(false);
  };

  useImperativeHandle(ref, () => ({
    resetForm,
  }));

  const handleSubmit = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return Alert.alert("Not signed in");

    try {
      if (entryType === "goal") {
        let selectedCoach: Coach | undefined = undefined;
        if (coach) {
          // Find the coach object from COACHES and add nudgeFrequency
          const foundCoach = COACHES.find((c) => c.id === coach.id);
          if (foundCoach) {
            selectedCoach = {
              ...foundCoach,
              nudgeFrequency:
                nudgeFrequency === "" ? undefined : Number(nudgeFrequency),
            };
          }
        }

        const newGoal = createGoal({
          title: goalTitle,
          goalNumber: goalNumber === "" ? 0 : Number(goalNumber),
          goalName,
          goalIcon,
          notify,
          notifyTime,
          frequency: frequency as Goal["frequency"],
          coach: selectedCoach,
        });
        await saveGoalToFirestore(newGoal, userId);
        onCreate(newGoal);
      } else {
        const newTask = createTask({
          title: taskTitle,
          frequency: frequency as Task["frequency"],
          notify,
          notifyTime,
        });
        await saveTaskToFirestore(newTask, userId);
        onCreate(newTask);
      }
    } catch (err) {
      console.error("Error saving entry:", err);
      Alert.alert("Error", "Failed to create entry.");
    }

    resetForm();
  };

  return (
    <View style={styles.modal}>
      <View style={styles.toggleRow}>
        <TouchableOpacity
          onPress={() => setEntryType("task")}
          style={[
            styles.toggleBtn,
            entryType === "task" && styles.toggleSelected,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              entryType === "task" && styles.toggleTextActive,
            ]}
          >
            Task
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setEntryType("goal")}
          style={[
            styles.toggleBtn,
            entryType === "goal" && styles.toggleSelected,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              entryType === "goal" && styles.toggleTextActive,
            ]}
          >
            Goal
          </Text>
        </TouchableOpacity>
      </View>
      {/* Title */}
      <View style={styles.inputRow}>
        <TextInput
          placeholder={`Enter new ${entryType} title ...`}
          placeholderTextColor="#999"
          style={styles.input}
          onChangeText={(text) => {
            if (entryType === "task") {
              setTaskTitle(text);
            } else {
              let cleaned = text.replace(/[^a-zA-Z ]/g, ""); // allow only letters and spaces
              cleaned = cleaned.replace(/\s+/g, " "); // collapse multiple spaces to one
              cleaned = cleaned.trim(); // remove leading/trailing spaces
              const parts = cleaned.split(" ");
              if (parts.length > 2) {
                cleaned = parts.slice(0, 2).join(" ");
              }
              cleaned = cleaned.slice(0, 12); // max 12 chars
              setGoalTitle(cleaned);
            }
          }}
          value={entryType === "task" ? taskTitle : goalTitle}
          maxLength={entryType === "task" ? 25 : 12}
        />
      </View>
      {/* Goal Title Inputs */}
      {entryType === "goal" ? (
        <>
          <View style={styles.goalRow}>
            <TouchableOpacity onPress={() => setIconModalVisible(true)}>
              <View style={styles.goalIcon}>
                <Text style={{ fontSize: 22 }}>{goalIcon}</Text>
              </View>
            </TouchableOpacity>
            <TextInput
              placeholder="Goal number"
              placeholderTextColor="#999"
              value={goalNumber === "" ? "" : String(goalNumber)}
              onChangeText={(text) => {
                // Only allow numbers
                const numeric = text.replace(/[^0-9]/g, "");
                setGoalNumber(numeric === "" ? "" : Number(numeric));
              }}
              keyboardType="numeric"
              style={[styles.goalInput, { paddingHorizontal: 10 }]}
              maxLength={5}
            />
            <TextInput
              placeholder="Goal name"
              placeholderTextColor="#999"
              value={goalName}
              onChangeText={(text) => {
                // Only allow letters, no spaces, and limit length
                const cleaned = text.replace(/[^a-zA-Z]/g, "").slice(0, 11);
                setGoalName(cleaned);
              }}
              style={[styles.goalInput, { paddingHorizontal: 10 }]}
              maxLength={11}
            />
            {/* {goalName.length > 0 &&
            (goalName.length < 10 || goalName.length > 13) ? (
              <Text
                style={{
                  color: "red",
                  alignSelf: "flex-start",
                  marginBottom: 4,
                }}
              >
                Goal name must be 10-13 letters, no spaces.
              </Text>
            ) : null} */}
          </View>
          <Modal
            visible={iconModalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setIconModalVisible(false)}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "rgba(0,0,0,0.5)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#222",
                  borderRadius: 20,
                  padding: 20,
                  width: 300,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    marginBottom: 10,
                    fontWeight: "bold",
                  }}
                >
                  Select an Icon
                </Text>
                <FlatList
                  data={arrGoalIcons}
                  numColumns={5}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        setGoalIcon(item);
                        setIconIndex(arrGoalIcons.indexOf(item));
                        setIconModalVisible(false);
                        setIconSelected(true); // Stop cycling after selection
                      }}
                      style={{
                        padding: 10,
                        margin: 5,
                        borderRadius: 10,
                        backgroundColor:
                          goalIcon === item ? "#FFB2E3" : "transparent",
                      }}
                    >
                      <Text style={{ fontSize: 28, textAlign: "center" }}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setIconModalVisible(false)}
                  style={{ marginTop: 15 }}
                >
                  <Text style={{ color: "#FFB2E3", fontWeight: "bold" }}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        ""
      )}

      {/* Frequency options */}
      <View style={styles.frequencyRow}>
        {["Daily", "Today", "30 days"].map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() =>
              setFrequency(f as Goal["frequency"] | Task["frequency"])
            }
            style={[styles.freqBtn, frequency === f && styles.freqBtnSelected]}
          >
            <Text
              style={[
                styles.freqText,
                frequency === f && styles.freqTextActive,
              ]}
            >
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Time & Notification */}
      <View style={styles.goalRow}>
        <View
          style={[
            styles.goalInput,
            {
              height: 48,
              paddingLeft: 15,
            },
          ]}
        >
          <Ionicons
            name="timer-outline"
            size={22}
            style={styles.icon}
            color="#999"
          />

          {Platform.OS === "ios" ? (
            <TouchableOpacity
              onPress={() =>
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: [...timeOptions, "Cancel"],
                    cancelButtonIndex: timeOptions.length,
                    userInterfaceStyle: "dark",
                  },
                  (index) => {
                    if (index !== timeOptions.length)
                      setNotifyTime(timeOptions[index]);
                  }
                )
              }
            >
              <Text style={styles.goalIconInput}>
                {notifyTime ? notifyTime : "Add time"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={notifyTime || ""}
                onValueChange={(value) => {
                  if (value !== "") setNotifyTime(value);
                }}
                style={styles.picker}
                dropdownIconColor="#fff"
                mode="dropdown"
              >
                <Picker.Item label="Add time" value="" />
                {timeOptions.map((t) => (
                  <Picker.Item key={t} label={t} value={t} />
                ))}
              </Picker>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[
            styles.goalIoniIcon,
            { backgroundColor: notify ? "#FFB2E3" : "#17191A" },
          ]}
          onPress={() => setNotify(!notify)}
        >
          <Ionicons
            name="notifications"
            size={22}
            color={notify ? "#17191A" : "#999"}
          />
        </TouchableOpacity>
      </View>

      {/* Coach */}
      {entryType === "goal" && (
        <>
          <Text style={styles.label}>Coach (optional)</Text>
          <View style={styles.goalRow}>
            <View
              style={[
                styles.goalInput,
                {
                  height: 48,
                  paddingLeft: 15,
                },
              ]}
            >
              <Feather
                name="user-check"
                size={20}
                color={"#999"}
                style={styles.icon}
              />

              {Platform.OS === "ios" ? (
                <TouchableOpacity
                  onPress={() =>
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options: [...COACHES.map((c) => c.name), "Cancel"],
                        cancelButtonIndex: COACHES.length,
                        userInterfaceStyle: "dark",
                      },
                      (index) => {
                        if (index < COACHES.length) setCoach(COACHES[index]);
                      }
                    )
                  }
                >
                  <Text style={styles.goalIconInput}>
                    {coach ? coach.name : "Add coach"}
                  </Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.pickerWrapper}>
                  <Picker
                    selectedValue={coach?.id || ""}
                    onValueChange={(value) => {
                      if (value !== "") {
                        const foundCoach = COACHES.find((c) => c.id === value);
                        if (foundCoach) setCoach(foundCoach);
                      }
                    }}
                    style={[styles.picker, { color: "#fff" }]}
                    dropdownIconColor="#5D5F60"
                    mode="dropdown"
                    placeholder="Add coach"
                  >
                    <Picker.Item label="Add coach" value="" />
                    {COACHES.map((c) => (
                      <Picker.Item key={c.id} label={c.name} value={c.id} />
                    ))}
                  </Picker>
                </View>
              )}
            </View>
            {coach && (
              <TextInput
                placeholder="Nudge frequency"
                placeholderTextColor="#999"
                value={nudgeFrequency === "" ? "" : String(nudgeFrequency)}
                onChangeText={(text) => {
                  const numeric = text.replace(/[^0-9]/g, "");
                  setNudgeFrequency(numeric === "" ? "" : Number(numeric));
                }}
                keyboardType="numeric"
                style={[styles.goalInput, { paddingHorizontal: 10 }]}
                maxLength={5}
              />
            )}
          </View>
        </>
      )}

      {/* Submit */}
      <TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
        <Text style={styles.submitText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
});

export default CreateEntryModal;

const styles = StyleSheet.create({
  pickerWrapper: {
    minWidth: 110,
    justifyContent: "center",
    width: 160,
    height: 47,
  },
  picker: {
    textAlign: "left",
    color: "#fff",
    fontSize: 18,
    marginLeft: -10,
    width: "100%",
  },
  modal: {
    backgroundColor: "#17191A",

    flex: 1,
  },
  icon: {
    color: "#5D5F60",
    marginRight: 4,
    alignSelf: "center",
  },
  goalIoniIcon: {
    height: 47,
    width: 47,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#7A7B7B",
    borderWidth: 1,
    borderRadius: 25,
  },
  goalIconInput: {
    color: "#999",
    width: "auto",
    flex: 1,
    fontSize: 20,
  },
  toggleRow: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 40,
    borderRadius: 100,
    borderColor: "#7A7B7B",
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  toggleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 50,
  },
  toggleSelected: {
    borderColor: "#FFB2E3",
    backgroundColor: "#FFB2E3",
    zIndex: 99,
  },
  toggleText: {
    fontSize: 18,
    color: "#aaa",
    fontWeight: "600",
  },
  toggleTextActive: {
    color: "#000",
  },
  label: {
    color: "#7A7B7B",
    fontSize: 11,
    marginBottom: Platform.OS === "ios" ? 0 : 8,
    marginTop: 27,
  },
  goalRow: {
    flexDirection: "row",
    marginTop: Platform.OS === "ios" ? 10 : 0,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-start",
  },
  goalIcon: {
    height: 47,
    width: 47,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "center",
    position: "relative",
    borderColor: "#7A7B7B",
    borderWidth: 1,
    borderRadius: 25,
    marginRight: 8,
  },
  goalInput: {
    flexDirection: "row",
    alignContent: "flex-start",
    alignItems: "center",
    borderColor: "#7A7B7B",
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: Platform.OS === "ios" ? 12 : 0,
    paddingVertical: Platform.OS === "ios" ? 10 : 0,
    color: "#fff",
    marginRight: 8,
    fontSize: 20,
  },
  input: {
    color: "#ffff",
    flex: 1,
    fontSize: 20,
    fontWeight: "500",
  },
  frequencyRow: {
    marginTop: 50,
    flexDirection: "row",
    marginBottom: Platform.OS === "ios" ? 7 : 14,
  },
  freqBtn: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderColor: "#7A7B7B",
    borderWidth: 1,
    borderRadius: 30,
    marginRight: 8,
  },
  freqBtnSelected: {
    backgroundColor: "#FFB2E3",
  },
  freqText: {
    color: "#999",
    fontSize: 20,
  },
  freqTextActive: {
    color: "#17191A",
    fontWeight: "700",
  },
  timeRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  submitBtn: {
    backgroundColor: "#FFB2E3",
    borderRadius: 40,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 25,
    position: "absolute",
    bottom: 10,
    width: "100%",
  },
  submitText: {
    color: "#17191A",
    fontWeight: "bold",
    fontSize: 16,
  },
});

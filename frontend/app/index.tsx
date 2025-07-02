import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "expo-router";
import { DrawerActions } from "@react-navigation/native";
import CalendarStrip from "../components/CalendarStrip";
import GoalCard from "../components/GoalCard";
import TaskChecklist from "../components/TaskChecklist";
import FAB from "../components/FAB";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import GoalDetailsSheet from "../components/GoalDetailsSheet";
import { Goal, Task } from "@/constants/types";
import {
  collection,
  onSnapshot,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db, auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const sheetRef = useRef<BottomSheet>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [sheetIndex, setSheetIndex] = useState(-1);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const openGoalSheet = (goal: Goal) => {
    setSelectedGoal(goal);
    sheetRef.current?.expand();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setName(firebaseUser?.displayName?.split(" ")[0] ?? "");
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!user) return;
    setLoading(true);

    const goalsRef = collection(db, "users", user.uid, "goals");
    const unsubscribeGoals = onSnapshot(goalsRef, (snapshot) => {
      const fetchedGoals = snapshot.docs.map((doc) => ({
        ...(doc.data() as Goal),
        id: doc.id,
      }));
      setGoals(fetchedGoals);
      setLoading(false);
    });

    const tasksRef = collection(db, "users", user.uid, "tasks");
    const unsubscribeTasks = onSnapshot(tasksRef, (snapshot) => {
      const fetchedTasks = snapshot.docs.map((doc) => ({
        ...(doc.data() as Task),
        id: doc.id,
      }));
      setTasks(fetchedTasks);
      setLoading(false);
    });

    return () => {
      unsubscribeGoals();
      unsubscribeTasks();
    };
  }, [user]);

  const onToggleTask = async (taskId: string) => {
    try {
      if (!user) return;
      const taskRef = doc(db, "users", user.uid, "tasks", taskId);
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;
      const prev = task.completedByDate?.[selectedDate] || false;
      await updateDoc(taskRef, {
        [`completedByDate.${selectedDate}`]: !prev,
      });
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };
  const onDeleteTask = async (taskId: string) => {
    try {
      if (!user) return;
      const taskRef = doc(db, "users", user.uid, "tasks", taskId);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onUpdateGoalProgress = async (goalId: string, newProgress: number) => {
    try {
      if (!user) return;
      const goalRef = doc(db, "users", user.uid, "goals", goalId);
      await updateDoc(goalRef, {
        [`progressByDate.${selectedDate}`]: newProgress,
      });
    } catch (error) {
      console.error("Error updating goal progress:", error);
    }
  };

  const filteredGoals = goals.filter((g) => {
    const startDate = new Date(g.startDate);
    const endDate = g.endDate ? new Date(g.endDate) : null;
    const goalDate = new Date(selectedDate);

    return (
      g.frequency === "Daily" ||
      (goalDate >= startDate && (!endDate || goalDate <= endDate))
    );
  });
  const filteredTasks = tasks.filter((t) => {
    const td = new Date(t.startDate);
    const taskDate = new Date(selectedDate);

    return (
      td.toISOString().split("T")[0] === selectedDate ||
      (taskDate >= td && t.frequency === "Daily")
    );
  });

  const timeOfDay = new Date().getHours();
  const greeting =
    timeOfDay < 12
      ? "Good morning,"
      : timeOfDay < 18
      ? "Good afternoon,"
      : "Good evening,";
  // Fetch goals and tasks from Firestore

  const fetchData = async () => {
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const goalsSnap = await getDocs(collection(db, "users", userId, "goals"));
    const tasksSnap = await getDocs(collection(db, "users", userId, "tasks"));

    const fetchedGoals: Goal[] = goalsSnap.docs.map(
      (doc) => doc.data() as Goal
    );
    const fetchedTasks: Task[] = tasksSnap.docs.map(
      (doc) => doc.data() as Task
    );

    setGoals(fetchedGoals);
    setTasks(fetchedTasks);
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#FFB2E3" />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: Platform.OS === "ios" ? 60 : 40 },
      ]}
    >
      <View style={styles.heading}>
        <View>
          <Text style={styles.h2}>{greeting}</Text>
          <Text style={styles.h1}>{name}</Text>
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
      {filteredGoals.length > 0 ? (
        <FlatList
          data={filteredGoals}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => openGoalSheet(item)}>
              <GoalCard
                goal={item}
                progress={item.progressByDate?.[selectedDate] || 0}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.goalList}
          style={{
            flexGrow: 0,
          }}
        />
      ) : (
        <View style={styles.card}>
          <Text
            style={{
              color: "#fff",
              fontSize: 16,
              opacity: 0.7,
              fontStyle: "italic",
            }}
          >
            🎯 Start your first goal to track your progress!
          </Text>
        </View>
      )}
      <Text style={styles.section}>things to do</Text>
      <TaskChecklist
        tasks={filteredTasks.map((t) => ({
          ...t,
          completed: t.completedByDate?.[selectedDate] || false,
        }))}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
      />
      <FAB />
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
        ref={sheetRef}
        index={-1}
        snapPoints={["70%"]}
      >
        <BottomSheetView style={{ flex: 1, padding: 20 }}>
          {selectedGoal && (
            <GoalDetailsSheet
              goal={selectedGoal}
              progress={selectedGoal.progressByDate?.[selectedDate] || 0}
              onUpdateProgress={onUpdateGoalProgress}
            />
          )}
        </BottomSheetView>
      </BottomSheet>
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
  card: {
    padding: 11,
    backgroundColor: "#17191A",
    borderRadius: 18,
    marginRight: 7,
    height: 120,
    justifyContent: "center",
    display: "flex",
    marginBottom: 30,
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

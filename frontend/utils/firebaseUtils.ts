// lib/firebaseUtils.ts
import { Goal, Task } from "@/constants/types";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

const removeUndefinedFields = <T extends object>(obj: T): Partial<T> => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== undefined)
    ) as Partial<T>;
};

export const saveGoalToFirestore = async (goal: Goal, userId: string) => {
    const cleaned = removeUndefinedFields(goal);
    const ref = collection(db, "users", userId, "goals");
    await addDoc(ref, cleaned);
};

export const saveTaskToFirestore = async (task: Task, userId: string) => {
    const cleaned = removeUndefinedFields(task);
    const ref = collection(db, "users", userId, "tasks");
    await addDoc(ref, cleaned);
};
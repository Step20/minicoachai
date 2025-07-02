// utils/createEntry.ts
import { Coach, Goal, Task } from "@/constants/types";
import { nanoid } from "nanoid/non-secure";

export const createGoal = ({
    title,
    goalNumber,
    goalName,
    goalIcon,
    frequency,
    notify,
    notifyTime,
    coach,
    progress
}: {
    title: string;
    goalNumber: string;
    goalName: string;
    goalIcon: string;
    frequency: Goal["frequency"];
    notify: boolean;
    notifyTime: string;
    progress: number;
    coach?: Coach;
}): Goal => ({
    id: nanoid(),
    title,
    goalIcon,
    goalNumber: parseInt(goalNumber),
    goalName,
    completed: false,
    startDate: new Date().toISOString().split("T")[0],
    endDate:
        frequency === "30 days"
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
            : undefined,
    frequency,
    streaks: 0,
    notify: notify,
    notifyTime: notifyTime || "",
    coach: coach
        ? coach
        : undefined,
    progress: 0
});

export const createTask = ({
    title,
    frequency,
    notify,
    notifyTime,
}: {
    title: string;
    frequency: Task["frequency"];
    notify: boolean;
    notifyTime: string;
}): Task => ({
    id: nanoid(),
    title,
    completed: false,
    startDate: new Date().toISOString().split("T")[0],
    endDate:
        frequency === "30 days"
            ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
            : undefined,
    frequency,
    notify: notify,
    notifyTime: notifyTime || "",
});

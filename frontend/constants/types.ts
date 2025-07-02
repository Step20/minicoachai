import { Float } from "react-native/Libraries/Types/CodegenTypes";

// types.ts
export interface Coach {
    id: string;              // recommended over just a name for data integrity
    name: string;
    nudgeFrequency?: number;
}

export interface Goal {
    id: string;
    title: string;
    goalIcon: string;
    goalNumber: number;
    goalName: string;
    completed: boolean;
    startDate: string;
    endDate?: string;
    frequency: "Daily" | "One-time" | "30 days";
    streaks: number;
    progress: number;
    progressByDate: { [date: string]: number };
    notify: boolean;
    notifyTime?: string;
    coach?: Coach;
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    startDate: string;
    endDate?: string;
    frequency: "Daily" | "One-time" | "30 days";
    notify: boolean;
    notifyTime?: string;
    completedByDate: { [date: string]: boolean };
}

export interface UserType {
    id: string;
    fullname: string;
    email: string;
    password?: string;
    createdAt: string;
    updatedAt: string;
    signedIn: boolean;
    tasks: Task[];
    goals: Goal[];
}

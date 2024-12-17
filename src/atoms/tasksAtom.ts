import { atom } from 'jotai'
import { Task } from "@/models/tasks.ts";

export const tasksAtom = atom<Task[]>([]);
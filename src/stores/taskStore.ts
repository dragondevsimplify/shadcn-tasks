import { atom } from 'jotai'
import { Task } from "@/models/tasks.ts";

export const taskListAtom = atom<Task[]>([]);
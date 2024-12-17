import { atom } from 'jotai'
import { Task } from "@/models/tasks.ts";

export const tasksAtom = atom<Task[]>([]);
export const isLoadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);
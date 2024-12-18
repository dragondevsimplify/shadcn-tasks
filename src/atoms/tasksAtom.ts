import { atom } from 'jotai'
import { Task } from "@/models/tasks.ts";
import { Pagination } from "@/models/pagination.ts";

export const tasksAtom = atom<Task[]>([]);
export const isLoadingAtom = atom(false);
export const errorAtom = atom<Error | null>(null);
export const paginationAtom = atom<Pagination>({
  pageNumber: 1,
  pageSize: 5,
  pageSizeOptions: [3, 5, 10],
  totalItems: 0,
  totalPages: 0,
  listLength: 0,
});
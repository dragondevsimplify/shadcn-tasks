import { Task, TaskSearchInfoList } from "@/models/tasks.ts";
import { CreateTaskSchema, UpdateTaskSchema } from "@/schemas/tasks.ts";
import { ResponseList } from "@/models/response.ts";
import axios from 'axios';
import { Pagination } from "@/models/pagination.ts";

const API_URL = 'http://localhost:5245/tasks';

export async function createTaskApi(task: CreateTaskSchema) {
  const res = await axios.post<Task>(API_URL, task);
  return res.data;
}

export async function updateTaskApi(taskId: number, updatedTask: UpdateTaskSchema) {
  const res = await axios.put<Task>(`${API_URL}/${taskId}`, updatedTask);
  return res.data;
}

export async function deleteTaskApi(taskId: number) {
  const res = await axios.delete<Task>(`${API_URL}/${taskId}`);
  return res.data;
}

export async function getTaskByIdApi(taskId: number) {
  const res = await axios.get<Task>(API_URL + '/' + taskId);
  return res.data;
}

export async function getTaskListApi(pagination?: Pagination, searchInfoList?: TaskSearchInfoList) {
  const params = new URLSearchParams();
  
  if (!pagination) {
    params.append('GetAll', 'true')
  } else {
    params.append('Page', pagination.pageNumber + '')
    params.append('PageSize', pagination.pageSize + '')
  }
  
  if (searchInfoList) {
    for (const k in searchInfoList) {
      // @ts-ignore
      const v = searchInfoList[k];
      params.append(k.charAt(0).toUpperCase() + k.slice(1), `${v}`);
    }
  }

  const res = await axios.get<ResponseList<Task>>(API_URL, {
    params
  });
  return res.data;
}
import { Task } from "@/models/tasks.ts";
import { CreateTaskSchema, UpdateTaskSchema } from "@/schemas/tasks.ts";
import { ResponseList } from "@/models/response.ts";
import axios from 'axios';

const API_URL = 'http://localhost:5245/tasks';

export async function createTaskApi(task: CreateTaskSchema): Promise<Task> {
  const res = await axios.post<Promise<Task>>(API_URL, task);
  return res.data;
}

export async function updateTask(taskId: number, updatedTask: UpdateTaskSchema) {
  const res = await axios.put(`${API_URL}/${taskId}`, updatedTask);
  return res.data;
}

export async function deleteTask(taskId: number) {
  const res = await axios.delete(`${API_URL}/${taskId}`);
  return res.data;
}

export async function getTaskListApi() {
  const params = new URLSearchParams();
  params.append('GetAll', 'true')
  
  const res = await axios.get<ResponseList<Task>>(API_URL, {
    params
  });
  return res.data;
}
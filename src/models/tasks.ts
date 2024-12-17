export type TaskType = 'bug' | 'feature' | 'documentation'
export type TaskStatus = 'todo' | 'backlog' | 'in_progress' | 'done' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: number;
  name: string;
  title: string;
  description: string;
  type: TaskType;
  status: TaskStatus;
  priority: TaskPriority;
}
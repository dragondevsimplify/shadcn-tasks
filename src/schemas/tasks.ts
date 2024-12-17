import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  title: z.string(),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  priority: z.string(),
});

export const createTaskSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required!'
  }),
  description: z.string(),
  type: z.string().min(1, {
    message: 'Type is required!'
  }),
  status: z.string().min(1, {
    message: 'Status is required!'
  }),
  priority: z.string().min(1, {
    message: 'Priority is required!'
  }),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required!'
  }),
  description: z.string(),
  type: z.string().min(1, {
    message: 'Type is required!'
  }),
  status: z.string().min(1, {
    message: 'Status is required!'
  }),
  priority: z.string().min(1, {
    message: 'Priority is required!'
  }),
});

export type TaskSchema = z.infer<typeof taskSchema>;
export type CreateTaskSchema = z.infer<typeof createTaskSchema>;
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;
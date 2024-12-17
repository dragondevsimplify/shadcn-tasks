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
})

export const createTaskSchema = z.object({
  title: z.string().min(1, {
    message: 'Title is required!'
  }),
  description: z.string(),
  type: z.string(),
  status: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>
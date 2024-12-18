import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import Tiptap from "@/components/tiptap/tiptap.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { taskPriorities, taskStatuses, taskTypes } from "@/data/tasks.ts";
import { Button } from "@/components/ui/button.tsx";
import { useTasks } from "@/hooks/useTasks.ts";
import { Task } from "@/models/tasks.ts";
import { useForm } from "react-hook-form";
import { createTaskSchema, UpdateTaskSchema } from "@/schemas/tasks.ts";
import { zodResolver } from "@hookform/resolvers/zod";

interface Props {
  task?: Task;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}

export function TasksEditForm({ task, onUpdateSuccess, onCancel }: Props) {
  const { updateTask } = useTasks();
  
  const form = useForm<UpdateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: task?.title,
      description: task?.description,
      type: task?.type,
      status: task?.status,
      priority: task?.priority,
    },
  });
  
  function handleDescriptionBinding(content: string) {
    form.setValue("description", content);
  }
  
  function handleSubmit(values: UpdateTaskSchema) {
    if (!task) {
      return
    }
    
    updateTask(+task.id, values, onUpdateSuccess)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 mt-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='form-ctrl-required'>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <Tiptap content={field.value} onBlur={handleDescriptionBinding}/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='form-ctrl-required'>Type</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskTypes.map(type =>
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='form-ctrl-required'>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskStatuses.map(type =>
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='form-ctrl-required'>Priority</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a priority"/>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskPriorities.map(type =>
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage/>
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="submit">Update</Button>
          <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}
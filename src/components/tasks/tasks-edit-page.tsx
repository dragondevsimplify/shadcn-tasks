import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import Tiptap from "@/components/tiptap/tiptap.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { taskPriorities, taskStatuses, taskTypes } from "@/data/tasks.ts";
import { Button } from "@/components/ui/button.tsx";
import { useTasks } from "@/hooks/useTasks.ts";
import { useForm } from "react-hook-form";
import { createTaskSchema, CreateTaskSchema } from "@/schemas/tasks.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router";
import { getTaskByIdApi } from "@/apis/tasksApi.ts";
import { useQuery } from "@tanstack/react-query";
import { Task } from "@/models/tasks.ts";

export function TasksEditPage() {
  const { createTask } = useTasks();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { isFetching } = useQuery<Task | null | undefined, Error>({
    queryKey: ['getTaskById'],
    queryFn: loadTask,
  })
  
  const form = useForm<CreateTaskSchema>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      status: "",
      priority: "",
    },
  });
  
  async function loadTask() {
    if (!id) {
      return;
    }
    
    const task = await getTaskByIdApi(+id);
    console.log(task, isFetching);
    form.reset(task);
    return task;
  }
  
  function bindingDescription(content: string) {
    form.setValue("description", content);
  }
  
  function formSubmit(values: CreateTaskSchema) {
    createTask(values, () => {
      //
    })
  }
  
  function handleCancel() {
    navigate("/");
  }
  
  if (isFetching) {
    return <div>Loading form ...</div>
  }
  
  return (
    <Form {...form}>
      <h3 className='text-2xl accent-gray-800 font-semibold'>Editing task: {id}</h3>
      
      <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8 mt-6">
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
              <Tiptap content={field.value} onBlur={bindingDescription} />
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
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskTypes.map(type =>
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
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
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskStatuses.map(type =>
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
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
                    <SelectValue placeholder="Select a priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {taskPriorities.map(type =>
                    <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 justify-end">
          <Button type="submit">Update</Button>
          <Button type="button" variant="secondary" onClick={handleCancel}>Cancel</Button>
        </div>
      </form>
    </Form>
  )
}
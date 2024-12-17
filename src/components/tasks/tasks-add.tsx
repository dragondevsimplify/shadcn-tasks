import { createTaskSchema } from "@/schemas/tasks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Shadcn UI imports
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { CirclePlus } from "lucide-react";
import Tiptap from "@/components/tiptap/tiptap.tsx";
import { taskPriorities, taskStatuses, taskTypes } from '@/data/tasks'
import { Task } from "@/models/tasks.ts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

type CreateTask = z.infer<typeof createTaskSchema>;

async function createTaskApi(task: CreateTask): Promise<Task> {
  const res = await fetch('http://localhost:5245/tasks', {
    method: "POST",
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

function TasksAdd() {
  const queryClient = useQueryClient();
  
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  
  const form = useForm<z.infer<typeof createTaskSchema>>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "",
      status: "",
      priority: "",
    },
  });
  
  const createTaskMutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: createTaskApi,
    onSuccess: async() => {
      await queryClient.invalidateQueries(['getTaskList'])
      setIsOpenDialog(false);
    }
  })
  
  function interactOutside(e: Event) {
    e.preventDefault();
  }
  
  function bindingDescription(content: string) {
    form.setValue("description", content)
  }
  
  function formSubmit(values: CreateTask) {
    createTaskMutation.mutate(values)
  }
  
  return (
    <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
      <DialogTrigger asChild>
        <Button>
          <CirclePlus/>
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent onInteractOutside={interactOutside}>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>
        
        {/* Dialog body */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Button type="submit">Add task</Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export { TasksAdd };

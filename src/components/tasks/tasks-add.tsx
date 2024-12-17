import { createTaskSchema } from "@/schemas/tasks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { CirclePlus } from "lucide-react";
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
import Tiptap from "@/components/tiptap/tiptap.tsx";

function TasksAdd() {
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
  
  function interactOutside(e: Event) {
    e.preventDefault();
  }
  
  function bindingDescription(content: string) {
    form.setValue("description", content)
  }
  
  function formSubmit(values: z.infer<typeof createTaskSchema>) {
    console.log(values);
  }
  
  return (
    <Dialog>
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
                  <FormLabel>Title</FormLabel>
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

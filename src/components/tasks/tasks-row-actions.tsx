import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { taskSchema } from "@/schemas/tasks";
import { useTasks } from "@/hooks/useTasks.ts";
import { useState } from "react";

interface TasksRowActionsProps<TData> {
  row: Row<TData>;
}

export function TasksRowActions<TData>({ row }: TasksRowActionsProps<TData>) {
  const { deleteTask } = useTasks()
  const [isShowDeleteConfirm, setIsShowDeleteConfirm] = useState(false);
  
  const task = taskSchema.parse(row.original);
  
  function handleShowDeleteConfirm() {
    setIsShowDeleteConfirm(true);
  }
  
  function handleDeleteTask() {
    deleteTask(task.id, () => {
      setIsShowDeleteConfirm(false);
    })
  }
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem>Edit with page</DropdownMenuItem>
          <DropdownMenuItem>Edit with sheet</DropdownMenuItem>
          <DropdownMenuItem onClick={handleShowDeleteConfirm}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={isShowDeleteConfirm} onOpenChange={setIsShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will delete the task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteTask}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { TasksEditForm } from "@/components/tasks/tasks-edit-form.tsx";
import { Task } from "@/models/tasks.ts";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  task: Task;
}

export function TasksEditSheet({ isOpen, setIsOpen, task }: Props) {
  const handlePreventDefault = (e: Event) => {
    e.preventDefault();
  }
  
  const handleFormSubmitSuccess = () => {
    setIsOpen(false);
  }
  
  const handleFormCancel = () => {
    setIsOpen(false);
  }
  
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent onInteractOutside={handlePreventDefault}>
        <SheetHeader>
          <SheetTitle>Task editing: {task.name}</SheetTitle>
        </SheetHeader>
        
        <TasksEditForm task={task} onUpdateSuccess={handleFormSubmitSuccess} onCancel={handleFormCancel}/>
      </SheetContent>
    </Sheet>
  )
}
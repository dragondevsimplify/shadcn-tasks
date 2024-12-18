import { useTasks } from "@/hooks/useTasks.ts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TasksTable } from "@/components/tasks/tasks-table.tsx";
import { columns } from "@/components/tasks/tasks-columns.tsx";
import { TasksAdd } from "./tasks-add";
import { TasksPagination } from "@/components/tasks/tasks-pagination.tsx";
import { TasksToolbox } from "@/components/tasks/tasks-toolbox.tsx";

function Tasks() {
  const { tasks } = useTasks();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Welcome React</h2>
          <TasksAdd />
        </CardTitle>
        <CardDescription>
          <p className="text-muted-foreground text-zinc-600 text-base">
            Here's a list of your tasks for this month!
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TasksToolbox />
        <TasksTable columns={columns} data={tasks ?? []} />
        <TasksPagination />
      </CardContent>
    </Card>
  );
}

export { Tasks };

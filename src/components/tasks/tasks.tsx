import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TasksTable } from "@/components/tasks/tasks-table.tsx";
import { Task, columns } from "@/components/tasks/tasks-columns.tsx";
import { TasksAdd } from "./tasks-add";

function Tasks() {
  const data: Task[] = [
    {
      id: 1,
      name: "Task-8782",
      title:
        "You can't compress the program without quantifying the open-source SSD",
      type: "documentation",
      status: "in_progress",
      priority: "medium",
    },
    {
      id: 2,
      name: "Task-7878",
      title:
        "Try to calculate the EXE feed, maybe it will index the multi-byte pixel!",
      type: "feature",
      status: "backlog",
      priority: "medium",
    },
    {
      id: 3,
      name: "Task-7839",
      title: "We need to bypass the neural TCP card!",
      type: "bug",
      status: "todo",
      priority: "high",
    },
  ];

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
        <TasksTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}

export { Tasks };

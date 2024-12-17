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
import { useQuery } from '@tanstack/react-query';
import { Task } from "@/models/tasks.ts";
import { ResponseList } from "@/models/response.ts";
import { getTaskListApi } from "@/apis/taskApi.ts";

function Tasks() {
  const { data: getTaskListRes, error, isLoading } = useQuery<ResponseList<Task>, Error>({
    queryKey: ['getTaskList'],
    queryFn: getTaskListApi,
  });
  
  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (error instanceof Error) {
    return <div>Error: {error.message}</div>
  }
  
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
        <TasksTable columns={columns} data={getTaskListRes?.list ?? []} />
      </CardContent>
    </Card>
  );
}

export { Tasks };

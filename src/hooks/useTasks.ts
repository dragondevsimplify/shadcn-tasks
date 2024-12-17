import { useAtom } from 'jotai';
import { tasksAtom, isLoadingAtom, errorAtom } from '@/atoms/tasksAtom.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskListApi, createTaskApi } from '@/apis/tasksApi.ts';
import { ResponseList } from "@/models/response.ts";
import { Task } from "@/models/tasks.ts";

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  
  const queryClient = useQueryClient();
  
  // GET Tasks
  const { data: getTaskListRes, isLoading: queryLoading } = useQuery<ResponseList<Task>, Error>({
    queryKey: ['getTaskList'],
    queryFn: getTaskListApi,
  });
  
  // CREATE Task
  const createMutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: createTaskApi,
    onSuccess: (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]);
      queryClient.invalidateQueries(['getTaskList']);
    },
    onError: (err) => {
      setError(err as Error);
    },
  });
  
  return {
    tasks: getTaskListRes?.list || tasks,
    isLoading: queryLoading || isLoading,
    error,
    createTask: createMutation.mutate,
  };
};

import { useAtom } from 'jotai';
import { tasksAtom, isLoadingAtom, errorAtom } from '@/atoms/tasksAtom.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskListApi, createTaskApi } from '@/apis/tasksApi.ts';
import { ResponseList } from "@/models/response.ts";
import { Task } from "@/models/tasks.ts";
import { CreateTaskSchema } from "@/schemas/tasks.ts";

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
    mutationFn: async(action: {
      newTask: CreateTaskSchema,
      successCallback: Function,
    }) => {
      const res = await createTaskApi(action.newTask);
      return {
        newTask: res,
        successCallback: action.successCallback
      }
    },
    onSuccess: (payload) => {
      setTasks((prevTasks) => [...prevTasks, payload.newTask]);
      queryClient.invalidateQueries(['getTaskList']);
      
      // Invoke callback
      if (payload.successCallback && typeof payload.successCallback === 'function') {
        payload.successCallback()
      }
    },
    onError: (err) => {
      setError(err as Error);
    },
  });
  
  const createTaskHandler = (newTask: CreateTaskSchema, successCallback: Function) => {
    createMutation.mutate({ newTask, successCallback })
  }
  
  return {
    tasks: getTaskListRes?.list || tasks,
    isLoading: queryLoading || isLoading,
    error,
    createTask: createTaskHandler,
  };
};

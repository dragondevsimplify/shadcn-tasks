import { useAtom } from 'jotai';
import { tasksAtom, isLoadingAtom, errorAtom } from '@/atoms/tasksAtom.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskListApi, createTaskApi, deleteTaskApi } from '@/apis/tasksApi.ts';
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
    queryFn: async() => {
      const res = await getTaskListApi()
      setTasks(res.list ?? [])
      return res;
    },
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
        response: res,
        successCallback: action.successCallback
      }
    },
    onSuccess: async({ response, successCallback }) => {
      await queryClient.invalidateQueries(['getTaskList']);
      
      // Invoke callback
      if (successCallback && typeof successCallback === 'function') {
        successCallback()
      }
    },
    onError: (err) => {
      setError(err as Error);
    },
  });
  
  // DELETE Task
  const deleteMutation = useMutation({
    mutationKey: ['deleteTask'],
    mutationFn: async(action: {
      taskId: number,
      successCallback: Function,
    }) => {
      const res = await deleteTaskApi(action.taskId);
      return {
        response: res,
        successCallback: action.successCallback
      }
    },
    onSuccess: async({ response, successCallback }) => {
      await queryClient.invalidateQueries(['getTaskList']);
      
      // Invoke callback
      if (successCallback && typeof successCallback === 'function') {
        successCallback()
      }
    },
    onError: (err) => {
      setError(err as Error);
    },
  });
  
  const createTaskHandler = (newTask: CreateTaskSchema, successCallback: Function) => {
    createMutation.mutate({ newTask, successCallback })
  }
  
  const deleteTaskHandler = (taskId: number, successCallback: Function) => {
    deleteMutation.mutate({ taskId, successCallback })
  }
  
  return {
    tasks: getTaskListRes?.list || tasks,
    isLoading: queryLoading || isLoading,
    error,
    createTask: createTaskHandler,
    deleteTask: deleteTaskHandler,
  };
};

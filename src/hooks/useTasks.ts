import { useAtom } from 'jotai';
import { tasksAtom, isLoadingAtom, errorAtom, paginationAtom, searchInfoListAtom } from '@/atoms/tasksAtom.ts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTaskListApi, createTaskApi, deleteTaskApi, updateTaskApi } from '@/apis/tasksApi.ts';
import { ResponseList } from "@/models/response.ts";
import { Task, TaskSearchInfoList } from "@/models/tasks.ts";
import { CreateTaskSchema, UpdateTaskSchema } from "@/schemas/tasks.ts";
import { Pagination } from "@/models/pagination.ts";

export const useTasks = () => {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [isLoading] = useAtom(isLoadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [pagination, setPagination] = useAtom(paginationAtom);
  const [searchInfoList, setSearchInfoList] = useAtom(searchInfoListAtom);
  
  const queryClient = useQueryClient();
  
  // GET Tasks
  const { data: getTaskListRes, isLoading: queryLoading } = useQuery<ResponseList<Task>, Error>({
    queryKey: ['getTaskList', pagination, searchInfoList],
    queryFn: async() => {
      const res = await getTaskListApi(pagination, searchInfoList);
      
      setTasks(res.list ?? [])
      setPagination(prevState => ({
        ...prevState,
        ...res,
        listLength: res.list.length,
      }));
      
      return res;
    },
  });
  
  // CREATE Task
  const createMutation = useMutation({
    mutationKey: ['createTask'],
    mutationFn: async(action: {
      newTask: CreateTaskSchema,
      successCallback: () => void,
    }) => {
      const res = await createTaskApi(action.newTask);
      return {
        response: res,
        successCallback: action.successCallback
      }
    },
    onSuccess: async({ response, successCallback }) => {
      // Invoke callback
      if (successCallback && typeof successCallback === 'function') {
        successCallback()
      }
      
      queryClient.invalidateQueries(['getTaskList']);
    },
    onError: (err) => {
      setError(err as Error);
    },
  });
  
  // UPDATE Task
  const updateMutation = useMutation({
    mutationKey: ['updateTask'],
    mutationFn: async(action: {
      taskId: number,
      task: UpdateTaskSchema,
      successCallback: () => void,
    }) => {
      const res = await updateTaskApi(action.taskId, action.task);
      return {
        response: res,
        successCallback: action.successCallback
      }
    },
    onSuccess: async({ response, successCallback }) => {
      // Invoke callback
      if (successCallback && typeof successCallback === 'function') {
        successCallback()
      }
      
      queryClient.invalidateQueries(['getTaskList']);
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
      successCallback: () => void,
    }) => {
      const res = await deleteTaskApi(action.taskId);
      return {
        response: res,
        successCallback: action.successCallback
      }
    },
    onSuccess: async({ response, successCallback }) => {
      // Invoke callback
      if (successCallback && typeof successCallback === 'function') {
        successCallback()
      }
      
      queryClient.invalidateQueries(['getTaskList']);
    },
    onError: (err) => {
      setError(err as Error);
    },
  });
  
  const createTaskHandler = (newTask: CreateTaskSchema, successCallback: () => void) => {
    createMutation.mutate({ newTask, successCallback })
  }
  
  const updateTaskHandler = (taskId: number, task: UpdateTaskSchema, successCallback: () => void) => {
    updateMutation.mutate({ taskId, task, successCallback })
  }
  
  const deleteTaskHandler = (taskId: number, successCallback: () => void) => {
    deleteMutation.mutate({ taskId, successCallback })
  }
  
  const changePaginationHandler = (pagination: Pagination) => {
    setPagination({ ...pagination });
  }
  
  const changeSearchInfoListHandler = (searchInfoList: TaskSearchInfoList) => {
    setSearchInfoList({ ...searchInfoList });
  }
  
  return {
    tasks: getTaskListRes?.list || tasks,
    isLoading: queryLoading || isLoading,
    error,
    pagination,
    searchInfoList,
    setPagination: changePaginationHandler,
    setSearchInfoList: changeSearchInfoListHandler,
    createTask: createTaskHandler,
    updateTask: updateTaskHandler,
    deleteTask: deleteTaskHandler,
  };
};

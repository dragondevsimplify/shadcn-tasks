import { useNavigate, useParams } from "react-router";
import { getTaskByIdApi } from "@/apis/tasksApi.ts";
import { useCallback, useEffect, useState } from "react";
import { TasksEditForm } from "@/components/tasks/tasks-edit-form.tsx";
import { Task } from "@/models/tasks.ts";

export function TasksEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [isFetching, setIsFetching] = useState(true);
  const [task, setTask] = useState<Task>();
  
  const loadTask = useCallback(async() => {
    if (!id) {
      return;
    }
    
    const task = await getTaskByIdApi(+id);
    
    setTask(task);
    setIsFetching(false);
  }, [id])
  
  const handleFormSubmitSuccess = () => {
    navigate("/");
  }
  
  const handleFormCancel = () => {
    navigate("/");
  }
  
  useEffect(() => {
    loadTask();
  }, [id, loadTask]);
  
  if (isFetching) {
    return <div>Loading form ...</div>
  }
  
  return (
    <div>
      <h3 className='text-2xl accent-gray-800 font-semibold mb-6'>Editing task: {task.name}</h3>
      <TasksEditForm task={task} onUpdateSuccess={handleFormSubmitSuccess} onCancel={handleFormCancel}/>
    </div>
  )
}
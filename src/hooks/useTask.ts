import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/fakeApi";
import { Task, TaskWithTimer } from "../types";

export const useTasks = () => {
  const {
    data: tasks,
    error,
    isLoading,
    refetch,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [tasksState, setTasksState] = useState<TaskWithTimer[]>([]);
  const [isResetting, setIsResetting] = useState(false); 

  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const tasksWithTimer: TaskWithTimer[] = tasks.map((task) => ({
        ...task,
        timeRemaining: task.lifetime,
      }));
      setTasksState(tasksWithTimer);
    }
  }, [tasks]);

  const handleReset = useCallback(async () => {
    setIsResetting(true); 
    const { data } = await refetch();
    if (data && data.length > 0) {
      const tasksWithTimer: TaskWithTimer[] = data.map((task) => ({
        ...task,
        timeRemaining: task.lifetime,
      }));
      setTasksState(tasksWithTimer);
    }
    setIsResetting(false); 
  }, [refetch]);

  const handleDelete = useCallback((taskId: number) => {
    setTasksState((prevState) => prevState.filter((task) => task.id !== taskId));
  }, []);

  return {
    tasksState,
    error,
    isLoading: isLoading || isResetting,
    handleDelete,
    handleReset,
  };
};
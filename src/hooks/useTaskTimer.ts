import { useState, useEffect } from "react";
import { TaskWithTimer } from "../types";

export const useTaskTimer = (initialTasks: TaskWithTimer[]) => {
  const [tasksState, setTasksState] = useState<TaskWithTimer[]>(initialTasks);

  useEffect(() => {
    setTasksState(initialTasks); 
  }, [initialTasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasksState((prevState) =>
        prevState
          .map((task) =>
            task.timeRemaining > 0
              ? { ...task, timeRemaining: task.timeRemaining - 1 }
              : task
          )
          .filter((task) => task.timeRemaining > 0)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return tasksState;
};

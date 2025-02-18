import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/fakeApi";
import { Spinner } from './Spinner';

export function TaskList() {
  const {
    data: tasks,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const [tasksState, setTasksState] = useState([]);
  const [isRefetching, setIsRefetching] = useState(false);

  const initializeTasks = useCallback((tasks) => {
    const tasksWithTimer = tasks.map((task) => ({
      ...task,
      timeRemaining: task.lifetime,
    }));
    console.log("Tareas inicializadas:", tasksWithTimer);
    setTasksState(tasksWithTimer);
  }, []);

  useEffect(() => {
    if (tasks) {
      initializeTasks(tasks);
    }
  }, [tasks, initializeTasks]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTasksState((prevState) => {
        return prevState
          .map((task) =>
            task.timeRemaining > 0 ? { ...task, timeRemaining: task.timeRemaining - 1 } : task
          )
          .filter((task) => task.timeRemaining > 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundColor = (timeRemaining, lifetime) => {
    const percentage = (timeRemaining / lifetime) * 100;

    if (percentage <= 20) return "bg-red-500";
    if (percentage <= 50) return "bg-yellow-500";
    return "bg-gray-300";
  };

  const handleDelete = (taskId) => {
    setTasksState((prevState) => prevState.filter((task) => task.id !== taskId));
  };

  const handleReset = () => {
    setIsRefetching(true);
    console.log("Refetching data...");
    refetch().then(() => {
      if (tasks) {
        initializeTasks(tasks);
      }
      setIsRefetching(false);
    });
  };

  if (isLoading || isRefetching) return <Spinner />; 
  if (error) return <p>Error al cargar las tareas</p>;

  return (
    <div>
      <button
        onClick={handleReset}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        Reiniciar Lista
      </button>

      {tasksState.map((task) => (
        <div
          key={task.id}
          className={`p-4 rounded-lg mb-4 ${getBackgroundColor(task.timeRemaining, task.lifetime)}`}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Tiempo restante: {task.timeRemaining} días</p>
          <button
            onClick={() => handleDelete(task.id)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
}

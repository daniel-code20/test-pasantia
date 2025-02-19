import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/fakeApi";
import { Spinner } from "./Spinner";

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
            task.timeRemaining > 0
              ? { ...task, timeRemaining: task.timeRemaining - 1 }
              : task
          )
          .filter((task) => task.timeRemaining > 0);
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundColor = (timeRemaining, lifetime) => {
    const percentage = (timeRemaining / lifetime) * 100;

    if (percentage <= 20) return "bg-red-100";
    if (percentage <= 50) return "bg-yellow-100";
    return "bg-gray-100";
  };

  const handleDelete = (taskId) => {
    setTasksState((prevState) =>
      prevState.filter((task) => task.id !== taskId)
    );
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
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center">
        Lista de Tareas 📋
      </h1>
      <div className="mb-6">
        <button
          onClick={handleReset}
          className="bg-blue-200 text-blue-500 font-medium px-4 py-2 rounded hover:bg-blue-300 transition"
        >
          Reiniciar Lista
        </button>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {tasksState.map((task) => (
            <div
              key={task.id}
              className={`w-full rounded-lg overflow-hidden shadow-lg flex flex-col justify-between min-h-[220px] ${getBackgroundColor(
                task.timeRemaining,
                task.lifetime
              )}`}
            >
              <div className="p-4 flex-grow">
                <h3 className="text-lg font-bold">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.description}</p>
                <p className="text-sm text-gray-700 font-medium">
                  Tiempo restante: {task.timeRemaining} segundos
                </p>
              </div>

              <div className="bg-white p-4 flex justify-center">
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-200 text-red-500 font-medium px-4 py-2 rounded w-full hover:bg-red-300 transition"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

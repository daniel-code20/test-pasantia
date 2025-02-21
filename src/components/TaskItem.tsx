import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { TaskWithTimer } from "../types";

interface TaskItemProps {
  task: TaskWithTimer;
  onDelete: (taskId: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = React.memo(({ task, onDelete }) => {
  const [timeRemaining, setTimeRemaining] = useState(task.timeRemaining);
  
  useEffect(() => {

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(task.timeRemaining);
  }, [task.timeRemaining]);
  
  
  const backgroundColor = useMemo(() => {
    const percentage = (timeRemaining / task.lifetime) * 100;
    if (percentage <= 20) return "bg-red-100";
    if (percentage <= 50) return "bg-yellow-100";
    return "bg-gray-100";
  }, [timeRemaining, task.lifetime]);

  if (timeRemaining <= 0) {
    return null;
  }

  return (
    <div
      className={`w-full rounded-lg overflow-hidden shadow-lg flex flex-col justify-between min-h-[220px] ${backgroundColor}`}
    >
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-bold">{task.title}</h3>
        <p className="text-sm text-gray-500">{task.description}</p>
        <p className="text-sm text-gray-700 font-medium">
          Tiempo restante: {timeRemaining} segundos
        </p>
      </div>

      <div className="bg-white p-4 flex justify-center">
        <button
          onClick={() => onDelete(task.id)}
          className="bg-red-200 text-red-500 font-medium px-4 py-2 rounded w-full hover:bg-red-300 transition"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
});
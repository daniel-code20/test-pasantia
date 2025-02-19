import { useTasks } from "../hooks/useTask";
import { useTaskTimer } from "../hooks/useTaskTimer";
import { useEffect, useState } from "react";
import { Title, ResetButton, Spinner, TaskGrid } from "../components";

export const TaskList: React.FC = () => {
  const {
    tasksState: initialTasks,
    error,
    isLoading,
    handleDelete,
    handleReset,
  } = useTasks();

  const [tasks, setTasks] = useState(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
  }, [initialTasks]);

  const tasksState = useTaskTimer(tasks);

  if (isLoading) return <Spinner />;
  if (error) return <p>Error al cargar las tareas: {error.message}</p>;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-white p-4">
      <Title text="Lista de Tareas 📋" />
      <ResetButton onClick={handleReset} />
      <TaskGrid tasks={tasksState} onDelete={handleDelete} />
    </div>
  );
};

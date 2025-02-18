import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/fakeApi"; 

export function TaskList() {
  const { data: tasks, error, isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error al cargar las tareas</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong>: {task.description} (⏳ {task.lifetime} días)
        </li>
      ))}
    </ul>
  );
}

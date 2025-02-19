import * as React from "react";
import { TaskItem } from "../TaskItem";
import { TaskWithTimer } from "../../types";

interface TaskGridProps {
  tasks: TaskWithTimer[];
  onDelete: (taskId: number) => void;
}

export const TaskGrid: React.FC<TaskGridProps> = ({ tasks, onDelete }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};
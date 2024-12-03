import { Check, Trash2 } from "lucide-react";
import { Task } from "wasp/entities";

interface TodoItemProps {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm group">
      <button
        onClick={() => onToggle(task.id)}
        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.isDone
            ? "bg-blue-500 border-blue-500"
            : "border-gray-300 hover:border-blue-500"
        }`}
      >
        {task.isDone && <Check className="w-4 h-4 text-white" />}
      </button>
      <span
        className={`flex-1 ${
          task.isDone ? "text-gray-400 line-through" : "text-gray-700"
        }`}
      >
        {task.description}
      </span>
      <button
        onClick={() => onDelete(task.id)}
        className="text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

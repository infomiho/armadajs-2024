import {
  createTask,
  updateTask,
  deleteTasks,
  useQuery,
  useAction,
  getTasks,
} from "wasp/client/operations";

import "./Main.css";
import { filterTodos, useFilters } from "./tasks/hooks";
import { TodoInput } from "./tasks/TodoInput";
import { TodoItem } from "./tasks/TodoItem";
import { TodoFiltersComponent } from "./tasks/TodoFilters";
import { Task } from "wasp/entities";
import { AuthUser } from "wasp/auth";

export const MainPage = ({ user }: { user: AuthUser }) => {
  const { data: tasks, isLoading, error } = useQuery(getTasks);

  const { filter, setFilter } = useFilters();

  const updateTaskOptimistically = useAction(updateTask, {
    optimisticUpdates: [
      {
        getQuerySpecifier: () => [getTasks],
        updateQuery: (newTask, oldTasks: Task[] | undefined) => {
          return oldTasks?.map((task) => {
            if (task.id === newTask.id) {
              return {
                ...task,
                ...newTask,
              };
            }
            return task;
          });
        },
      },
    ],
  });

  const deleteTasksOptimistically = useAction(deleteTasks, {
    optimisticUpdates: [
      {
        getQuerySpecifier: () => [getTasks],
        updateQuery: (deletedIds, oldTasks: Task[] | undefined) => {
          return oldTasks?.filter((task) => !deletedIds.includes(task.id));
        },
      },
    ],
  });

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error;

  const filteredTasks = filterTodos(tasks, filter);

  const completed = tasks.filter((task) => task.isDone).map((task) => task.id);

  return (
    <div className="space-y-4">
      <TodoInput onAdd={(description) => createTask({ description })} />

      <div className="space-y-2">
        {filteredTasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onToggle={() => {
              updateTaskOptimistically({
                id: task.id,
                isDone: !task.isDone,
              });
            }}
            onDelete={() => deleteTasksOptimistically([task.id])}
          />
        ))}
        {filteredTasks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No todos to display
          </div>
        )}
      </div>

      {tasks.length > 0 && (
        <TodoFiltersComponent
          currentFilter={filter}
          onFilterChange={setFilter}
          onClearCompleted={() => deleteTasksOptimistically(completed)}
        />
      )}
    </div>
  );
};

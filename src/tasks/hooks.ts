import { useState } from "react";
import { Task } from "wasp/entities";
import { TodoFilters } from "./types";

export const useFilters = () => {
  const [filter, setFilter] = useState<TodoFilters>("all");

  return {
    filter,
    setFilter,
  };
};

export const filterTodos = (tasks: Task[], filter: TodoFilters) => {
  switch (filter) {
    case "active":
      return tasks.filter((todo) => !todo.isDone);
    case "completed":
      return tasks.filter((todo) => todo.isDone);
    default:
      return tasks;
  }
};

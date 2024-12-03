import { TodoFilters } from "./types";

interface TodoFiltersProps {
  currentFilter: TodoFilters;
  onFilterChange: (filter: TodoFilters) => void;
  onClearCompleted: () => void;
}

export const TodoFiltersComponent: React.FC<TodoFiltersProps> = ({
  currentFilter,
  onFilterChange,
  onClearCompleted,
}) => {
  const filters: TodoFilters[] = ["all", "active", "completed"];

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white rounded-lg shadow-sm">
      <div className="flex gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-3 py-1 rounded-md capitalize transition-colors ${
              currentFilter === filter
                ? "bg-blue-500 text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
      <button
        onClick={onClearCompleted}
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        Clear completed
      </button>
    </div>
  );
};

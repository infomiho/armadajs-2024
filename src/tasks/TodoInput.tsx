import { useState } from "react";
import { PlusCircle } from "lucide-react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

export const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new todo..."
          className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-200 focus:outline-none focus:border-blue-500 transition-colors"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600 transition-colors"
        >
          <PlusCircle className="w-6 h-6" />
        </button>
      </div>
    </form>
  );
};

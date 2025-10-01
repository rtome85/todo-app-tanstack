import { useState } from "react";
import type { CreateTodoData, UpdateTodoData, Todo } from "../lib/types";

interface TodoFormProps {
  todo?: Todo;
  onSubmit: (data: CreateTodoData | UpdateTodoData) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function TodoForm({
  todo,
  onSubmit,
  onCancel,
  isLoading,
}: TodoFormProps) {
  const [title, setTitle] = useState(todo?.title || "");
  const [description, setDescription] = useState(todo?.description || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    await onSubmit({
      title: title.trim(),
      description: description.trim(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border rounded-lg p-6 shadow-sm"
    >
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter todo title..."
          required
          disabled={isLoading}
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter todo description..."
          disabled={isLoading}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isLoading || !title.trim()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Saving..." : todo ? "Update Todo" : "Create Todo"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isLoading}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

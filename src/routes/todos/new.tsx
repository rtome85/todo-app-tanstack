import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { TodoForm } from "../../components/TodoForm";
import { api } from "../../lib/api";
import type { CreateTodoData } from "../../lib/types";

function NewTodo() {
  const navigate = useNavigate();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: CreateTodoData) => {
    setIsLoading(true);
    try {
      const newTodo = await api.createTodo(data);

      // Invalidate todos list to refresh the cache
      await router.invalidate();

      // Navigate to the todos list
      navigate({ to: "/todos" });
    } catch (error) {
      console.error("Failed to create todo:", error);
      alert("Failed to create todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/todos" });
  };

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Create New Todo</h3>
      </div>

      <TodoForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}

export const Route = createFileRoute("/todos/new")({
  component: NewTodo,
});

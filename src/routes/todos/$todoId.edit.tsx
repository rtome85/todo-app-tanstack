import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { TodoForm } from "../../components/TodoForm";
import { api } from "../../lib/api";
import type { TodoFormData } from "../../lib/types";

function EditTodo() {
  const navigate = useNavigate();
  const router = useRouter();
  const todo = Route.useLoaderData();
  const { todoId } = Route.useParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: TodoFormData) => {
    setIsLoading(true);
    try {
      await api.updateTodo(Number(todoId), data);

      // Invalidate all cached data to refresh
      await router.invalidate();

      // Navigate back to todo detail
      navigate({ to: "/todos/$todoId", params: { todoId } });
    } catch (error) {
      console.error("Failed to update todo:", error);
      alert("Failed to update todo. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate({ to: "/todos/$todoId", params: { todoId } });
  };

  if (!todo) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-red-600">Todo not found</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-lg font-medium">Edit Todo</h3>
      </div>

      <TodoForm
        todo={todo}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isLoading={isLoading}
      />
    </div>
  );
}

export const Route = createFileRoute("/todos/$todoId/edit")({
  loader: ({ params }) => api.getTodo(Number(params.todoId)),
  component: EditTodo,
});

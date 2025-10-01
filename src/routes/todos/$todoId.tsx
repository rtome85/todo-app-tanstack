import {
  createFileRoute,
  Link,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { useState } from "react";
import { api } from "../../lib/api";
import { LoadingError } from "../../components/ErrorComponents";
import { Breadcrumbs } from "../../components/BreadCrumbs";

function TodoDetail() {
  const navigate = useNavigate();
  const router = useRouter();
  const todo = Route.useLoaderData();
  const { todoId } = Route.useParams();
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    setIsUpdating(true);
    setError(null);

    try {
      const success = await api.deleteTodo(Number(todoId));
      if (!success) {
        throw new Error("Failed to delete todo");
      }

      await router.invalidate();
      navigate({ to: "/todos" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleToggleComplete = async () => {
    setIsUpdating(true);
    setError(null);

    try {
      const updated = await api.updateTodo(Number(todoId), {
        completed: !todo.completed,
      });
      if (!updated) {
        throw new Error("Failed to update todo");
      }

      await router.invalidate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <Breadcrumbs />

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 text-red-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-800">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <h3
            className={`text-xl font-semibold ${todo.completed ? "line-through text-gray-500" : ""}`}
          >
            {todo.title}
          </h3>
          <span
            className={`px-3 py-1 text-sm rounded-full ${
              todo.completed
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            }`}
          >
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </div>

        <p className="text-gray-700 mb-4">{todo.description}</p>

        <p className="text-sm text-gray-500 mb-6">
          Created: {new Date(todo.createdAt).toLocaleDateString()}
        </p>

        <div className="flex gap-3">
          <button
            onClick={handleToggleComplete}
            disabled={isUpdating}
            className={`px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors ${
              todo.completed
                ? "bg-yellow-600 text-white hover:bg-yellow-700"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {isUpdating
              ? "Updating..."
              : `Mark as ${todo.completed ? "Pending" : "Completed"}`}
          </button>

          <Link
            to="/todos/$todoId/edit"
            params={{ todoId: todoId }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            disabled={isUpdating}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isUpdating ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TodoDetailPending() {
  return (
    <div>
      <div className="mb-6">
        <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
      </div>
      <div className="bg-white border rounded-lg p-6 shadow-sm">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-6"></div>
          <div className="flex gap-3">
            <div className="h-8 bg-gray-200 rounded w-20"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
            <div className="h-8 bg-gray-200 rounded w-16"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/todos/$todoId")({
  loader: async ({ params }) => {
    try {
      const todo = await api.getTodo(Number(params.todoId));
      if (!todo) {
        throw new Error(`Todo with ID ${params.todoId} not found`);
      }
      return todo;
    } catch (error) {
      // Add context to the error
      if (error instanceof Error) {
        throw new Error(`Failed to load todo: ${error.message}`);
      }
      throw new Error(`Failed to load todo with ID ${params.todoId}`);
    }
  },

  // Custom error handling for this route
  errorComponent: LoadingError,

  // Loading component
  pendingComponent: TodoDetailPending,

  // Loading timing configuration
  pendingMs: 500, // Show loading after 500ms
  pendingMinMs: 200, // Show loading for at least 200ms

  // Cache configuration
  staleTime: 30 * 1000, // Consider fresh for 30 seconds

  // Error handling during route loading
  onError: ({ error }) => {
    console.error("Todo detail route error:", error);
    // Could integrate with error tracking service here
  },

  component: TodoDetail,
});

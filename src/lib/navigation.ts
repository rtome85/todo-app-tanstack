import { useNavigate, useRouter } from "@tanstack/react-router";

export function useAppNavigation() {
  const navigate = useNavigate();
  const router = useRouter();

  return {
    // Navigate to todos list
    toTodosList: () => navigate({ to: "/todos" }),

    // Navigate to specific todo
    toTodo: (todoId: string | number) =>
      navigate({
        to: "/todos/$todoId",
        params: { todoId: todoId.toString() },
      }),

    // Navigate to edit todo
    toEditTodo: (todoId: string | number) =>
      navigate({
        to: "/todos/$todoId/edit",
        params: { todoId: todoId.toString() },
      }),

    // Navigate to create new todo
    toNewTodo: () => navigate({ to: "/todos/new" }),

    // Navigate back with fallback
    goBack: (fallbackTo: string = "/todos") => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigate({ to: fallbackTo });
      }
    },

    // Navigate with search parameters
    toTodosWithFilter: (
      filter: "all" | "completed" | "pending",
      search?: string,
    ) =>
      navigate({
        to: "/todos",
        search: { filter, search: search || "" },
      }),

    // Refresh current route
    refresh: () => router.invalidate(),
  };
}

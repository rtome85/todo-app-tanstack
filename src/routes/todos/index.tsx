import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import { api } from "../../lib/api";
import { useAppNavigation } from "../../lib/navigation";
import { Breadcrumbs } from "@/components/BreadCrumbs";

const todosSearchSchema = z.object({
  filter: z.enum(["all", "completed", "pending"]).default("all"),
  search: z.string().default(""),
});

function TodosList() {
  const todos = Route.useLoaderData();
  const { filter, search } = Route.useSearch();
  const navigation = useAppNavigation();

  const handleQuickAction = async (
    todoId: number,
    action: "toggle" | "delete",
  ) => {
    if (action === "toggle") {
      const todo = todos.find((t) => t.id === todoId);
      if (todo) {
        await api.updateTodo(todoId, { completed: !todo.completed });
        navigation.refresh();
      }
    } else if (action === "delete") {
      if (confirm("Are you sure you want to delete this todo?")) {
        await api.deleteTodo(todoId);
        navigation.refresh();
      }
    }
  };

  return (
    <div>
      <Breadcrumbs />

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">
          Your Todos ({todos.length})
          {filter !== "all" && (
            <span className="ml-2 text-sm text-gray-500">({filter})</span>
          )}
        </h3>

        <button
          onClick={() => navigation.toNewTodo()}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add New Todo
        </button>
      </div>

      {/* Enhanced Filter Controls */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex gap-4 items-center flex-wrap">
          <div>
            <label className="text-sm font-medium text-gray-700">Filter:</label>
            <div className="flex gap-2 mt-1">
              {(["all", "completed", "pending"] as const).map(
                (filterOption) => (
                  <button
                    key={filterOption}
                    onClick={() =>
                      navigation.toTodosWithFilter(filterOption, search)
                    }
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      filter === filterOption
                        ? "bg-blue-600 text-white"
                        : "bg-white border hover:bg-gray-50"
                    }`}
                  >
                    {filterOption.charAt(0).toUpperCase() +
                      filterOption.slice(1)}
                  </button>
                ),
              )}
            </div>
          </div>

          <div className="flex-1 min-w-64">
            <label className="text-sm font-medium text-gray-700">Search:</label>
            <input
              type="text"
              value={search}
              onChange={(e) =>
                navigation.toTodosWithFilter(filter, e.target.value)
              }
              placeholder="Search todos..."
              className="mt-1 block w-full px-3 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {(filter !== "all" || search) && (
            <button
              onClick={() => navigation.toTodosWithFilter("all", "")}
              className="text-sm text-gray-600 hover:text-gray-800"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            {filter !== "all" || search
              ? "No todos match your criteria."
              : "No todos yet. Create your first one!"}
          </p>
          {filter === "all" && !search && (
            <button
              onClick={() => navigation.toNewTodo()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create First Todo
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4
                    className={`font-medium ${todo.completed ? "line-through text-gray-500" : ""}`}
                  >
                    {todo.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {todo.description}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded ${
                        todo.completed
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {todo.completed ? "Completed" : "Pending"}
                    </span>
                    <span className="text-xs text-gray-500">
                      Created {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-4">
                  <div className="flex gap-2">
                    <Link
                      to="/todos/$todoId"
                      params={{ todoId: todo.id.toString() }}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </Link>
                    <Link
                      to="/todos/$todoId/edit"
                      params={{ todoId: todo.id.toString() }}
                      className="text-green-600 hover:underline text-sm"
                    >
                      Edit
                    </Link>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleQuickAction(todo.id, "toggle")}
                      className="text-xs text-purple-600 hover:underline"
                    >
                      {todo.completed ? "Mark Pending" : "Mark Done"}
                    </button>
                    <button
                      onClick={() => handleQuickAction(todo.id, "delete")}
                      className="text-xs text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const Route = createFileRoute("/todos/")({
  validateSearch: zodValidator(todosSearchSchema),
  loaderDeps: ({ search: { filter, search } }) => ({ filter, search }),
  loader: async ({ deps: { filter, search } }) => {
    let todos = await api.getTodos();

    if (filter !== "all") {
      todos = todos.filter((todo) =>
        filter === "completed" ? todo.completed : !todo.completed,
      );
    }

    if (search) {
      const searchLower = search.toLowerCase();
      todos = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          todo.description.toLowerCase().includes(searchLower),
      );
    }

    return todos;
  },
  staleTime: 2 * 60 * 1000,
  component: TodosList,
});

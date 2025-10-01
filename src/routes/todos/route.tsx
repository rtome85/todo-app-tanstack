import { createFileRoute, Outlet } from "@tanstack/react-router";

function TodosLayout() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Todo Management</h2>
      <Outlet />
    </div>
  );
}

export const Route = createFileRoute("/todos")({
  component: TodosLayout,
});

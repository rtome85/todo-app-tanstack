import { createFileRoute } from "@tanstack/react-router";

function Home() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Welcome to Todo App</h2>
      <p className="text-gray-600">
        This is a demo application showcasing TanStack Router features. Navigate
        to the Todos section to start managing your tasks!
      </p>
    </div>
  );
}

export const Route = createFileRoute("/")({
  component: Home,
});

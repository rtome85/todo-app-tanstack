import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import {
  TodoErrorFallback,
  NotFoundComponent,
} from "../components/ErrorComponents";

const RootComponent = () => (
  <>
    <header className="bg-blue-600 text-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl font-bold hover:text-blue-100">
            Todo App
          </Link>

          <nav className="flex gap-6">
            <Link
              to="/"
              className="[&.active]:font-bold [&.active]:text-blue-100 hover:text-blue-200 transition-colors"
              activeOptions={{ exact: true }}
            >
              Home
            </Link>

            <Link
              to="/todos"
              className="[&.active]:font-bold [&.active]:text-blue-100 hover:text-blue-200 transition-colors"
            >
              Todos
            </Link>

            <Link
              to="/about"
              className="[&.active]:font-bold [&.active]:text-blue-100 hover:text-blue-200 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>

    <main className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
      <Outlet />
    </main>

    <TanStackRouterDevtools />
  </>
);

export const Route = createRootRoute({
  component: RootComponent,
  // Global error component for unhandled errors
  errorComponent: TodoErrorFallback,
  // Global not found component
  notFoundComponent: NotFoundComponent,
});

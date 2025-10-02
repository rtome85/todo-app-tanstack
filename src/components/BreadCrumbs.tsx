import { Link, useMatches } from "@tanstack/react-router";

export function Breadcrumbs() {
  const matches = useMatches();

  // Build breadcrumb items from route matches
  const breadcrumbs = matches
    .filter((match) => match.pathname !== "/")
    .map((match) => {
      let label = "Unknown";
      let to = match.pathname;

      if (match.pathname === "/todos") {
        label = "Todos";
      } else if (match.pathname === "/about") {
        label = "About";
      } else if (
        match.pathname.startsWith("/todos/") &&
        match.pathname.endsWith("/new")
      ) {
        label = "New Todo";
      } else if (
        match.pathname.startsWith("/todos/") &&
        match.pathname.endsWith("/edit")
      ) {
        label = "Edit Todo";
      } else if (
        match.pathname.startsWith("/todos/") &&
        match.params &&
        "todoId" in match.params &&
        match.params.todoId
      ) {
        label = `Todo #${match.params.todoId}`;
      }

      return { label, to };
    });

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-500">
        <li>
          <Link to="/" className="hover:text-gray-700">
            Home
          </Link>
        </li>
        {breadcrumbs.map((breadcrumb, index) => (
          <li key={breadcrumb.to} className="flex items-center space-x-2">
            <span>/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 font-medium">
                {breadcrumb.label}
              </span>
            ) : (
              <Link to={breadcrumb.to} className="hover:text-gray-700">
                {breadcrumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

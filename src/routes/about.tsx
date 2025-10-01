import { createFileRoute } from "@tanstack/react-router";

function About() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">About This App</h2>
      <p className="text-gray-600 mb-4">
        This Todo application demonstrates the powerful features of TanStack
        Router:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2">
        <li>Type-safe routing with automatic TypeScript inference</li>
        <li>File-based routing with nested layouts</li>
        <li>Built-in data loading and caching</li>
        <li>Error boundaries and 404 handling</li>
        <li>Search parameter validation</li>
      </ul>
    </div>
  );
}

export const Route = createFileRoute("/about")({
  component: About,
});

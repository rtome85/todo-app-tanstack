import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

function ErrorTest() {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error("This is a test error to demonstrate error boundaries!");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Error Boundary Testing</h2>
      <p className="text-gray-600 mb-6">
        This page helps test the error handling capabilities of our Todo app.
      </p>

      <div className="space-y-4">
        <button
          onClick={() => setShouldError(true)}
          className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Trigger Component Error
        </button>

        <button
          onClick={() => {
            // Trigger a loader error by navigating to non-existent todo
            window.location.href = "/todos/99999";
          }}
          className="w-full bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          Trigger Loader Error
        </button>

        <button
          onClick={() => {
            window.location.href = "/non-existent-route";
          }}
          className="w-full bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Trigger 404 Error
        </button>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/error-test")({
  component: ErrorTest,
});

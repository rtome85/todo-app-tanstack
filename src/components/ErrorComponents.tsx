import { Link, useRouter } from "@tanstack/react-router";
import { ErrorComponent } from "@tanstack/react-router";

interface CustomErrorProps {
  error: Error;
  reset?: () => void;
  info?: {
    componentStack: string;
  };
}

export function TodoErrorFallback({ error, reset, info }: CustomErrorProps) {
  const router = useRouter();

  const handleRetry = async () => {
    if (reset) {
      reset();
    } else {
      // Fallback to router invalidation
      await router.invalidate();
    }
  };

  return (
    <div className="min-h-64 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">
            {error.message ||
              "An unexpected error occurred while loading this page."}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRetry}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/todos"
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
              Go to Todos
            </Link>
            <Link to="/" className="text-blue-600 hover:underline px-4 py-2">
              Go Home
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details className="mt-6 text-left">
              <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                Error Details (Development)
              </summary>
              <div className="mt-2 p-3 bg-gray-50 rounded text-xs font-mono text-gray-800">
                <div className="mb-2">
                  <strong>Error:</strong> {error.message}
                </div>
                <div className="mb-2">
                  <strong>Stack:</strong>
                  <pre className="mt-1 whitespace-pre-wrap">{error.stack}</pre>
                </div>
                {info?.componentStack && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 whitespace-pre-wrap">
                      {info.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export function NotFoundComponent() {
  return (
    <div className="min-h-64 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.87 0-5.431 1.5-6.873 3.797M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Page Not Found
          </h3>
          <p className="text-gray-600 mb-4">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="flex gap-3 justify-center">
          <Link
            to="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Go Home
          </Link>
          <Link
            to="/todos"
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
          >
            Browse Todos
          </Link>
        </div>
      </div>
    </div>
  );
}

export function LoadingError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-center py-8">
      <h3 className="text-lg font-medium text-red-600 mb-2">
        Failed to load data
      </h3>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <div className="space-x-3">
        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>
        <Link to="/todos" className="text-blue-600 hover:underline">
          Back to todos
        </Link>
      </div>
    </div>
  );
}

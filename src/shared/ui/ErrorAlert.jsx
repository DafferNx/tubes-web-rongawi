'use client';

export function ErrorAlert({ message, onRetry }) {
  if (!message) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="mb-6 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-2.5">
        <span aria-hidden="true" className="font-bold text-red-600">!</span>
        <p className="font-medium leading-relaxed">{message}</p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="shrink-0 rounded-lg border border-red-300 bg-white px-3.5 py-1.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-100 focus:ring-2 focus:ring-red-500 outline-none"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

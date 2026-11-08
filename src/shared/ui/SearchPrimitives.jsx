export function Card({ className = '', ...props }) {
  return <div data-slot="card" className={`rounded-2xl border border-green-100 bg-white shadow-sm ${className}`} {...props} />;
}

export function CardContent({ className = '', ...props }) {
  return <div data-slot="card-content" className={`p-4 ${className}`} {...props} />;
}

export function Badge({ children }) {
  return <span data-slot="badge" className="inline-flex rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-800">{children}</span>;
}

export function Skeleton({ className = '' }) {
  return <div data-slot="skeleton" aria-hidden="true" className={`rounded-2xl bg-green-100 motion-safe:animate-pulse ${className}`} />;
}

export function Alert({ children }) {
  return <div data-slot="alert" role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">{children}</div>;
}

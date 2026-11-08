const fieldClass = 'h-11 w-full rounded-md border border-green-200 bg-white text-sm font-normal text-green-950 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-500';

export function Input({ className = '', ...props }) {
  return <input className={`${fieldClass} ${className}`} {...props} />;
}

export function Select({ className = '', ...props }) {
  return <select className={`${fieldClass} ${className}`} {...props} />;
}

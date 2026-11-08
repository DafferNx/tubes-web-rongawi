import Link from 'next/link';

const variants = {
  primary: 'bg-green-800 text-white hover:bg-green-900 aria-[current=page]:bg-green-950',
  ghost: 'text-green-900 hover:bg-green-100',
};

export function Button({ href, variant = 'primary', className = '', ...props }) {
  const classes = `inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 disabled:opacity-50 ${variants[variant]} ${className}`;

  if (href) return <Link href={href} className={classes} {...props} />;
  return <button type="button" className={classes} {...props} />;
}

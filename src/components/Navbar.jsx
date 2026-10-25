'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menus = [
  { href: '/', label: 'Beranda' },
  { href: '/search', label: 'Cari Resep' },
  { href: '/add-recipe', label: '+ Tulis Resep' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav aria-label="Navigasi utama" className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-4 px-5 pt-5 sm:grid-cols-2 lg:grid-cols-3 lg:py-4">
        <Link href="/" className="flex items-center gap-3 justify-self-center sm:justify-self-start">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-800 font-serif text-2xl text-white">R</span>
          <span className="text-xl font-bold tracking-tight text-stone-800">Ruang Resep<span className="text-green-700">.</span></span>
        </Link>

        <div className="order-last flex justify-center gap-1 border-t border-stone-100 pt-2 sm:col-span-2 lg:order-none lg:col-span-1 lg:border-0 lg:p-0">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href} aria-current={pathname === menu.href ? 'page' : undefined}
              className={`whitespace-nowrap rounded-t-lg border-b-2 px-3 py-3 text-sm font-medium transition-colors lg:rounded-lg ${pathname === menu.href ? 'border-green-800 bg-green-50 text-green-800 lg:border-transparent' : 'border-transparent text-stone-500 hover:bg-stone-50 hover:text-green-800'}`}>
              {menu.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4 text-sm sm:justify-end">
          <Link href="/profile" aria-current={pathname === '/profile' ? 'page' : undefined} className="border-r border-stone-200 pr-4 text-stone-500 hover:text-green-800 aria-[current=page]:text-green-800">Profil</Link>
          <Link href="/login" aria-current={pathname === '/login' ? 'page' : undefined} className="font-medium text-stone-600 hover:text-green-800 aria-[current=page]:text-green-800">Login</Link>
          <Link href="/register" aria-current={pathname === '/register' ? 'page' : undefined} className="rounded-lg bg-green-800 px-5 py-2.5 font-medium text-white transition-colors hover:bg-green-900">Register</Link>
        </div>
      </nav>
    </header>
  );
}

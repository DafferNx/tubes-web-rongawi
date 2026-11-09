'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/shared/ui/Button';

const menus = [
  { href: '/', label: 'Beranda', icon: 'm3 10 9-7 9 7v10h-6v-6H9v6H3Z' },
  { href: '/search', label: 'Cari Resep', icon: 'M16 10a6 6 0 1 1-12 0 6 6 0 0 1 12 0Zm-2 4 6 6' },
  { href: '/add-recipe', label: 'Tulis Resep', icon: 'M12 5v14M5 12h14' },
  { href: '/profile', label: 'Profil', icon: 'M16 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v2' },
];

export default function Navbar({ isLoggedIn = false }) {
  const pathname = usePathname();

  function currentPage(href) {
    return pathname === href ? 'page' : undefined;
  }

  return (
    <header className="sticky top-0 z-40 h-16 shrink-0 border-b lg:h-[4.5rem] border-green-100 bg-white text-green-950 max-lg:[&+main]:pb-[calc(6rem+env(safe-area-inset-bottom))]">
      <nav aria-label="Navigasi utama" className="grid h-full w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 px-4 sm:px-6 lg:grid-cols-[auto_1fr_auto_auto] lg:gap-x-5 lg:px-8">
        <Link href="/" className="inline-flex w-fit items-center gap-2 rounded-xl text-base font-bold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-300 sm:gap-3 sm:text-xl">
          <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-xl bg-green-800 font-serif text-2xl font-normal text-white ring-1 ring-green-500/40 sm:size-10">R</span>
          <span>Ruang Resep<span className="text-green-300">.</span></span>
        </Link>

        <ul className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-30 mx-auto grid max-w-sm grid-cols-4 gap-1 rounded-2xl border border-green-100 bg-white p-1.5 shadow-lg lg:static lg:mx-0 lg:flex lg:max-w-none lg:justify-self-center lg:rounded-full lg:bg-green-50 lg:p-1 lg:shadow-none">
          {menus.map(({ href, label, icon }) => (
            <li key={href} className={href === '/add-recipe' ? 'lg:hidden' : undefined}>
              <Link href={href} aria-current={currentPage(href)}
                className="flex flex-col items-center gap-1 whitespace-nowrap rounded-xl px-1 py-2 text-[11px] font-medium text-green-900 transition-colors hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-green-700 aria-[current=page]:bg-green-800 aria-[current=page]:text-white lg:rounded-full lg:px-4 lg:text-sm">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5 lg:hidden">
                  <path d={icon} />
                </svg>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2.5 text-xs text-green-900 sm:gap-3 sm:text-sm">
          {isLoggedIn ? <span className="text-green-800">Sudah masuk</span> : (
            <>
              <Link href="/login" aria-current={currentPage('/login')} className="hover:underline aria-[current=page]:underline">Masuk</Link>
              <Link href="/register" aria-current={currentPage('/register')} className="rounded-full border border-green-200 px-2 py-1.5 hover:bg-green-50 aria-[current=page]:underline sm:px-3">Daftar</Link>
            </>
          )}
        </div>

        <Button href="/add-recipe" aria-current={currentPage('/add-recipe')}
          className="justify-self-end max-lg:hidden">
          <span aria-hidden="true">+</span> Tulis Resep
        </Button>
      </nav>
    </header>
  );
}

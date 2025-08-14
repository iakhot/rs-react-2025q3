import ThemeToggle from 'components/Search/ThemeToggle';
import Link from 'next/link';
import type { ReactNode } from 'react';
import 'App.css';
import 'index.css';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="vw50">
        <div className="float-left">
          <Link href="/about">About</Link>
        </div>
        <div className="float-right">
          <ThemeToggle />
        </div>
      </div>
      {children}
    </>
  );
}

'use client';

import React from 'react';
import Link from 'next/link';
import ThemeContextProvider from 'context/ThemeContext';
import ThemeToggle from 'components/Search/ThemeToggle';

export function Header() {
  return (
    <ThemeContextProvider>
      <div className="vw50">
        <div className="float-left">
          <Link href="/about">About</Link>
        </div>
        <div className="float-right">
          <ThemeToggle />
        </div>
      </div>
    </ThemeContextProvider>
  );
}

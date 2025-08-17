'use client';

import React, { type ReactNode } from 'react';
import ThemeContextProvider from 'context/ThemeContext';
import ThemeToggle from 'components/Search/ThemeToggle';

export function Header({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <div className="vw50">
        <div className="float-left">{children}</div>
        <div className="float-right">
          <ThemeToggle />
        </div>
      </div>
    </ThemeContextProvider>
  );
}

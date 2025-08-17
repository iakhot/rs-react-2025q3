'use client';
import React, { type ReactNode } from 'react';
import ThemeContextProvider from '@/context/ThemeContext';
import ThemeToggle from '@/components/Search/ThemeToggle';
import { LocaleToggle } from '@/components/common/LocaleToggle';

export function Header({ children }: { children: ReactNode }) {
  return (
    <>
      <ThemeContextProvider>
        <div className="vw50">
          <div className="float-left">{children}</div>
          <div className="flex-child-container flex-row absolute right">
            <LocaleToggle />
            <ThemeToggle />
          </div>
        </div>
      </ThemeContextProvider>
    </>
  );
}

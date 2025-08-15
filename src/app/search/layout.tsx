import type { ReactNode } from 'react';
import 'App.css';
import 'index.css';
import { Header } from './Header';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        Icons by{' '}
        <a target="_blank" rel="noreferrer" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </>
  );
}

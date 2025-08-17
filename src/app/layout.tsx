import type { Metadata } from 'next';
import 'App.css';
import { Header } from './Header';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Movies search app',
  description: 'This is a training project for RS School React course',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <Header>
            <Link href="/about">About</Link>
          </Header>
          <div className="min-vh70">{children}</div>
          <div style={{ margin: '0 auto', textAlign: 'center' }}>
            Icons by{' '}
            <a target="_blank" rel="noreferrer" href="https://icons8.com">
              Icons8
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}

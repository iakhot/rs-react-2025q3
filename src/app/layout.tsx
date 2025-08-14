import type { Metadata } from 'next';
import 'App.css';

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
        <div id="root">{children}</div>
      </body>
    </html>
  );
}

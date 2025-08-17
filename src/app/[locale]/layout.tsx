import type { Metadata } from 'next';
import '@/App.css';
import '@/index.css';
import { Header } from './Header';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Movies search app',
  description: 'This is a training project for RS School React course',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const t = await getTranslations('RootLayout');
  return (
    <html lang="{locale}">
      <body>
        <NextIntlClientProvider>
          <div id="root">
            <Header>
              <ul>
                <li key={'home'}>
                  <Link href="/">{t('homeLink')}</Link>
                </li>
                <li key={'about'}>
                  <Link href="/about">{t('aboutLink')}</Link>
                </li>
              </ul>
            </Header>
            <div className="min-vh70">{children}</div>
            <div style={{ margin: '0 auto', textAlign: 'center' }}>
              {t('iconsby')}{' '}
              <a target="_blank" rel="noreferrer" href="https://icons8.com">
                Icons8
              </a>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

import React from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function Welcome() {
  const t = useTranslations('Welcome');
  return (
    <div className="card center vw50 flex-column">
      <h1>{t('welcomeText')}</h1>
      <button>
        <Link href="/search">{t('searchButton')}</Link>
      </button>
    </div>
  );
}

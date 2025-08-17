import { Link } from '@/i18n/navigation';
import '@/index.css';
import { useTranslations } from 'next-intl';

export function About() {
  const t = useTranslations('About');
  return (
    <div className="card center vw50 flex-column">
      <h2>
        {t('welcome')} {''}
        <Link
          href="https://rs.school/courses/reactjs"
          rel="noopener noreferrer"
        >
          {t('RSSLink')}.
        </Link>
      </h2>
      <p>
        {t('by')}{' '}
        <Link href="https://github.com/iakhot" rel="noopener noreferrer">
          iakhot
        </Link>
      </p>
    </div>
  );
}

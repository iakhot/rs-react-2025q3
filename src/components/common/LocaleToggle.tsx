import { Link } from '@/i18n/navigation';
import enIcon from '../../../public/uk-flag-32.png';
import esIcon from '../../../public/es-flag-32.png';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export function LocaleToggle() {
  const t = useTranslations('LocaleToggle');
  return (
    <details data-testid="locale-toggle" className="dropdown fw600">
      <summary>{t('changeLang')}</summary>

      <Link
        href="/"
        locale="en"
        className="flex-child-container center flex-row"
      >
        <Image alt={t('enImgAlt')} src={enIcon} width="32" />
        EN
      </Link>

      <Link
        href="/"
        locale="es"
        className="flex-child-container center flex-row"
      >
        <Image alt={t('esImgAlt')} src={esIcon} width="32" />
        ES
      </Link>
    </details>
  );
}

import { useTranslations } from 'next-intl';
import { useAppDispatch, useAppSelector, useTheme } from '../../common/hooks';
import { saveFileDialog } from '../../common/utils';
import { unselectAll, selectedMovies } from '../SearchResult/selectedSlice';
import './index.css';
import { createCSVBlob } from '@/app/[locale]/search/action';

export function DownloadSelected({ hidden = true }: { hidden: boolean }) {
  const { currentTheme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedObj = useAppSelector(selectedMovies);
  const t = useTranslations('DownloadSelected');

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  const handleDownload = async (ids: number[]) => {
    const getContent = createCSVBlob.bind(null, ids);
    const blob = await getContent();
    const filename = `${ids.length}_best_movies.csv`;
    if (blob) {
      await saveFileDialog(blob, filename);
    }
  };

  return (
    <details
      open
      data-testid="download-selected"
      className="flyout float-left"
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
    >
      <summary>
        {selectedObj.length} {t('itemsSelected')}
      </summary>
      <p>
        <button
          title={t('unselect')}
          onClick={handleUnselect}
          className={currentTheme}
        >
          {t('unselect')}
        </button>
      </p>
      <p>
        <button
          title={t('download')}
          onClick={() => handleDownload(selectedObj)}
          className={currentTheme}
        >
          {t('download')}
        </button>
      </p>
    </details>
  );
}

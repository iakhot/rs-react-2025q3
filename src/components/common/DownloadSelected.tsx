import type { Movie } from '../../App';
import { useAppDispatch, useAppSelector, useTheme } from '../../common/hooks';
import { formatCsv, saveFileDialog } from '../../common/utils';
import { unselectAll, selectedMovies } from '../SearchResult/selectedSlice';
import './index.css';

export function DownloadSelected({ hidden = true }: { hidden: boolean }) {
  const { currentTheme } = useTheme();
  const dispatch = useAppDispatch();
  const selectedObj = useAppSelector(selectedMovies);

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  const handleDownload = async (movies: Movie[]) => {
    const content = formatCsv(movies);
    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8',
    });
    const filename = `${movies.length}_best_movies.csv`;
    await saveFileDialog(blob, filename);
  };

  return (
    <details
      open
      id="download-selected"
      className="flyout float-left"
      style={{ visibility: hidden ? 'hidden' : 'visible' }}
    >
      <summary>{selectedObj.length} movies selected</summary>
      <p>
        <button
          title="Unselect all"
          onClick={handleUnselect}
          className={currentTheme}
        >
          Unselect all
        </button>
      </p>
      <p>
        <button
          title="Download"
          onClick={() => handleDownload(selectedObj)}
          className={currentTheme}
        >
          Download
        </button>
      </p>
    </details>
  );
}

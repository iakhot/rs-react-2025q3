import type { Movie } from '../../App';
import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { formatCsv } from '../../common/utils';
import { unselectAll, selectedMovies } from '../SearchResult/selectedSlice';
import './index.css';

export function DownloadSelected({ hidden = true }: { hidden: boolean }) {
  const dispatch = useAppDispatch();
  const selectedObj = useAppSelector(selectedMovies);

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  const handleDownload = (movies: Movie[]) => {
    const content = formatCsv(movies);
    const blob = new Blob([content], {
      type: 'text/CSSMathValue;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${movies.length}_best_movies.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
        <button title="Unselect all" onClick={handleUnselect}>
          Unselect all
        </button>
      </p>
      <p>
        <button title="Download" onClick={() => handleDownload(selectedObj)}>
          Download
        </button>
      </p>
    </details>
  );
}

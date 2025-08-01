import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { unselectAll, selectedMovies } from '../SearchResult/selectedSlice';

export function DownloadSelected() {
  const dispatch = useAppDispatch();
  const selectedObj = useAppSelector(selectedMovies);

  const handleUnselect = () => {
    dispatch(unselectAll());
  };

  return (
    <div id="download-selected">
      <span>{selectedObj.length} movies selected</span>
      <button title="Unselect all" onClick={handleUnselect}>
        Unselect all
      </button>
      <button title="Download">Download</button>
    </div>
  );
}

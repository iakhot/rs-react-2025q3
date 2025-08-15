import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from 'react';
import './index.css';
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from '../../common/hooks';
import { ThemeContext } from '../../context/ThemeContext';
import { unselectAll } from '../SearchResult/selectedSlice';
import { selectSearchTerm, setSearchTerm } from './searchSlice';
import { LS_KEYS } from '../../common/types';

import { useRouter } from 'next/navigation';

const getQueryString = (value: string): URLSearchParams => {
  const newQuery = new URLSearchParams();
  newQuery.set('query', value);
  newQuery.set('page', '1');
  return newQuery;
};

function Search() {
  const { currentTheme } = useContext(ThemeContext);
  const [, saveTerm] = useLocalStorage(LS_KEYS.term);
  const searchTerm = useAppSelector(selectSearchTerm);
  const [inputVal, setInputVal] = useState(searchTerm);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const newQuery = getQueryString(searchTerm);
    window.history.replaceState(null, '', `?${newQuery.toString()}`);
  }, []);

  const handleSearchClick = (value: string): void => {
    if (value !== undefined) {
      const term = value !== '' ? value.trim() : '';
      saveTerm(term);
      dispatch(setSearchTerm(term));
      dispatch(unselectAll());
      const newQuery = getQueryString(term);
      router.push(`?${newQuery.toString()}`);
    }
  };

  return (
    <div className="card center vw50">
      <input
        id="searchTerm"
        data-testid="search-input"
        className={`search-input input-${currentTheme}`}
        value={inputVal}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputVal(e.currentTarget.value)
        }
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          setInputVal(e.currentTarget?.value.trim())
        }
      />
      <button
        id="searchButton"
        data-testid="search-button"
        onClick={() => handleSearchClick(inputVal)}
        aria-label="Search button"
        title="Search"
        className={`search-button ${currentTheme}`}
      >
        {'Search'}
      </button>
    </div>
  );
}

export default Search;

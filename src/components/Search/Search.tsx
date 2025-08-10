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
import { useNavigate } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../../context/ThemeContext';
import { unselectAll } from '../SearchResult/selectedSlice';
import { selectSearchTerm, setSearchTerm } from './searchSlice';
import { LS_KEYS } from '../../common/types';

const getQueryString = (value: string): string => {
  return encodeURI(`search?query=${value}&page=1`);
};

function Search() {
  const { currentTheme } = useContext(ThemeContext);
  const [, saveTerm] = useLocalStorage(LS_KEYS.term);
  const searchTerm = useAppSelector(selectSearchTerm);
  const [inputVal, setInputVal] = useState(searchTerm);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigate(getQueryString(searchTerm));
  }, []);

  const handleSearchClick = (value: string): void => {
    if (value !== undefined) {
      const term = value !== '' ? value.trim() : '';
      saveTerm(term);
      dispatch(setSearchTerm(term));
      dispatch(unselectAll());
      navigate(getQueryString(term));
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
      <ThemeToggle />
    </div>
  );
}

export default Search;

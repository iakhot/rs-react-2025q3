import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from 'react';
import './index.css';
import { useLocalStorage } from '../../common/hooks';
import { useNavigate } from 'react-router';
import ThemeToggle from './ThemeToggle';
import { ThemeContext } from '../../context/ThemeContext';

const getQueryString = (value: string): string => {
  return encodeURI(`search?query=${value}&page=1`);
};

function Search() {
  const { currentTheme } = useContext(ThemeContext);
  const [savedTerm, saveTerm] = useLocalStorage('searchTerm');
  const [term, setTerm] = useState(savedTerm);
  const navigate = useNavigate();

  useEffect(() => {
    navigate(getQueryString(term));
  }, []);

  const handleSearchClick = (value: string): void => {
    if (value !== undefined) {
      const term = value !== '' ? value.trim() : '';
      saveTerm(term);
      navigate(getQueryString(term));
    }
  };

  return (
    <div className="card center vw50">
      <input
        id="searchTerm"
        data-testid="search-input"
        className={`search-input input-${currentTheme}`}
        value={term}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTerm(e.currentTarget.value)
        }
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          setTerm(e.currentTarget?.value.trim())
        }
      />
      <button
        id="searchButton"
        data-testid="search-button"
        onClick={() => handleSearchClick(term)}
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

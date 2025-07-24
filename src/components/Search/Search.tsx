import { useEffect, useState, type ChangeEvent, type FocusEvent } from 'react';
import './index.css';
import { useLocalStorage } from '../../common/hooks';

interface SearchProps {
  onSearch: (val: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const [savedTerm, saveTerm] = useLocalStorage('searchTerm');

  const [term, setTerm] = useState(savedTerm);

  useEffect(() => {
    onSearch(term);
  }, []);

  const handleSearchClick = (value: string): void => {
    if (value !== undefined) {
      const term = value.trim();
      saveTerm(term);
      onSearch(term);
    }
  };

  return (
    <div className="card center">
      <input
        id="searchTerm"
        data-testid="search-input"
        className="search-input"
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
      >
        {'Search'}
      </button>
    </div>
  );
}

export default Search;

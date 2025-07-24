import { useEffect, useState, type ChangeEvent, type FocusEvent } from 'react';
import './index.css';
import { loadFromStorage, saveToStorage } from '../../common/storageUtils';

interface SearchProps {
  onSearch: (val: string) => void;
}

function Search({ onSearch }: SearchProps) {
  const getTerm = () => {
    const saved = loadFromStorage();
    return saved !== undefined ? saved : '';
  };
  const [term, setTerm] = useState(getTerm);

  useEffect(() => {
    onSearch(term);
  }, []);

  const handleSearchClick = (value: string): void => {
    if (value !== undefined) {
      const term = value.trim();
      saveToStorage(term);
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

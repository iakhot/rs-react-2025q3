import { useState } from 'react';
import './index.css';

interface SearchProps {
  value: string | undefined;
  onSearch: (val: string | undefined) => void;
}

function Search({ value, onSearch }: SearchProps) {
  const [term, setTerm] = useState(value);
  return (
    <div className="card">
      <input
        id="searchTerm"
        className="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
      />
      <button
        id="searchButton"
        onClick={() => onSearch(term)}
        aria-label="Search button"
        title="Search"
      >
        {'Search'}
      </button>
    </div>
  );
}

export default Search;

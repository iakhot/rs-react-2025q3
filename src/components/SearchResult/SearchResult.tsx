import type { SearchResults } from '../../App';
import reactLogo from '../../assets/react.svg';
import CardList from './CardList';
import './index.css';

function SearchResult(props: SearchResults) {
  const { isLoading, results, error } = { ...props };
  return (
    <div className="card center vh10">
      {isLoading ? (
        <img src={reactLogo} className="logo react" alt="React logo" />
      ) : error ? (
        <p className="warning text-center">
          An error has occurred while loading the data: {error.message}
        </p>
      ) : (
        <CardList movies={results}></CardList>
      )}
    </div>
  );
}

export default SearchResult;

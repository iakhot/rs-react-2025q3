import type { SearchResults } from '../../App';
import Loader from '../Loader';
import CardList from './CardList';
import './index.css';

function SearchResult(props: SearchResults) {
  const { isLoading, results, error } = { ...props };
  return (
    <div className="card center vh10">
      {isLoading ? (
        <Loader />
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

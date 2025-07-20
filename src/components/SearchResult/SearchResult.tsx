import type { ApiError, SearchResults } from '../../App';
import Loader from '../Loader';
import CardList from './CardList';
import './index.css';

function SearchResult(props: SearchResults) {
  const { isLoading, results, error } = { ...props };

  const composeErrorMessage = (error: ApiError): string => {
    if (error.status) {
      const status = error.status;
      const message = `${status} ${error.statusText}`;
      return status >= 500
        ? `Server side error: ${message}`
        : status >= 400
          ? `Client side error: ${message}`
          : `${message}`;
    } else return error.message;
  };

  return (
    <div data-testid="search-result" className="card center vh10">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div data-testid="api-error" className="warning text-center">
          <div>An error has occurred while loading the data:</div>
          <div>{composeErrorMessage(error)}</div>
        </div>
      ) : (
        <CardList movies={results}></CardList>
      )}
    </div>
  );
}

export default SearchResult;

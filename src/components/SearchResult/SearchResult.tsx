import { useSearchParams } from 'next/navigation';
import './index.css';
import Loader from '../Loader';
import CardList from './CardList';
import { useGetMoviesQuery } from '../../common/moviesApi';
import { ErrorMessage } from '../common';

function SearchResult() {
  const params = useSearchParams();
  //const movieId = params.get('details');
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const term = params.get('query') ?? '';
  const { currentData, error, isFetching } = useGetMoviesQuery(
    {
      searchTerm: term,
      pageNumber: page,
    },
    { refetchOnMountOrArgChange: 300 }
  );
  if (error) {
    return <ErrorMessage error={error} className="card min-vh70" />;
  }

  if (isFetching && !currentData) {
    return <Loader className="container center min-vh70" />;
  }

  return (
    <>
      <div data-testid="search-result" className="card container min-vh70">
        {currentData ? <CardList items={currentData} /> : null}
        {/* {movieId && (
          <div className="card sidebar">
            <Outlet />
          </div>
        )} */}
      </div>
    </>
  );
}

export default SearchResult;

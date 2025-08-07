import { Outlet, useSearchParams } from 'react-router';
import './index.css';
import Loader from '../Loader';

import CardList from './CardList';

import { useGetMoviesQuery } from '../../common/moviesApi';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

function SearchResult() {
  const [params] = useSearchParams();
  const movieId = params.get('details');
  const page = params.get('page') ? Number(params.get('page')) : 1;
  const term = params.get('query') ?? '';
  const { data, error, isLoading } = useGetMoviesQuery({
    searchTerm: term,
    pageNumber: page,
  });

  return (
    <>
      <div data-testid="search-result" className="card container min-vh70">
        {isLoading ? (
          <Loader className="container center" />
        ) : error ? (
          <span>
            {' '}
            {`${(error as FetchBaseQueryError).status} ${JSON.stringify((error as FetchBaseQueryError).data)}`}{' '}
          </span>
        ) : data ? (
          <CardList items={data} />
        ) : null}
        {movieId && (
          <div className="card sidebar">
            <Outlet />
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResult;

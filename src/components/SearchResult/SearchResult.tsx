'use client';
import './index.css';
import { type ReactNode } from 'react';

import { useSearchParams } from 'next/navigation';
import { useGetMoviesQuery } from 'common/moviesApi';
import CardList from './CardList';
import { ErrorMessage } from 'components/common';
import Loader from 'components/Loader';

function SearchResult({ children }: { children: ReactNode }) {
  const params = useSearchParams();
  const page = Number(params.get('page') || 1);
  const term = params.get('query') ?? '';
  const movieId = params.get('details');

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
    return <Loader className="container center min-vh50" />;
  }

  return (
    <>
      <div data-testid="search-result" className="card container min-vh70">
        {currentData ? <CardList items={currentData} /> : null}
        {movieId ? <div className="card sidebar">{children}</div> : null}
      </div>
    </>
  );
}

export default SearchResult;

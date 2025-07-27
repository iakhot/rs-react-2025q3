import { Await, Outlet, useLoaderData, useSearchParams } from 'react-router';
import './index.css';
import Loader from '../Loader';
import React from 'react';
import CardList from './CardList';
import { useLocation } from 'react-router';

function SearchResult() {
  const { promise } = useLoaderData();
  const location = useLocation();
  const [params] = useSearchParams();
  const movieId = params.get('details');

  const getSuspenseKey = (): string => {
    const newQuery = new URLSearchParams(params);
    newQuery.delete('details');
    const searchURL = `${location.pathname}${newQuery.toString()}`;
    return searchURL;
  };

  return (
    <>
      <div data-testid="search-result" className="card container min-vh70">
        <React.Suspense
          fallback={<Loader className="container center" />}
          key={getSuspenseKey()}
        >
          <Await resolve={promise}>
            {(promise) => <CardList items={promise} />}
          </Await>
        </React.Suspense>
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

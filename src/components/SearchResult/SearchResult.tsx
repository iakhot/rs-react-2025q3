import { Await, useLoaderData } from 'react-router';
import './index.css';
import Loader from '../Loader';
import React from 'react';
import CardList from './CardList';
import { useLocation } from 'react-router';

function SearchResult() {
  const { promise } = useLoaderData();
  const location = useLocation();

  return (
    <div data-testid="search-result" className="card min-vh70">
      <React.Suspense
        fallback={<Loader className="container center" />}
        key={location.key}
      >
        <Await resolve={promise}>
          {(promise) => <CardList items={promise} />}
        </Await>
      </React.Suspense>
    </div>
  );
}

export default SearchResult;

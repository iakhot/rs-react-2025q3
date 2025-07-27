import {
  Await,
  NavLink,
  useLoaderData,
  useLocation,
  useSearchParams,
} from 'react-router';
import './index.css';
import React from 'react';
import Loader from '../components/Loader';

function MovieDetails() {
  const [params] = useSearchParams();
  const { promise } = useLoaderData();
  const location = useLocation();

  const newQuery = new URLSearchParams(params);
  newQuery.delete('details');

  return (
    <>
      <NavLink to={{ search: newQuery.toString() }} className="sticky">
        &larr; Back
      </NavLink>

      <div className="flex-child-container details">
        <React.Suspense
          fallback={<Loader className="container center" />}
          key={location.key}
        >
          <Await resolve={promise}>
            {(promise) => (
              <div className="details-column">
                <div className="flex-row">
                  <span className="movie-tilte">{promise.name}</span>
                  <span
                    className="rating-border"
                    aria-label="rating"
                    title="rating"
                  >
                    {promise.rating}
                  </span>
                </div>
                <div className="card flex-child-container center">
                  <img src={promise.posterURL} />
                  <span>{promise.genres}</span>
                  <div className="flex-child-container flex-row timings">
                    <span title="release year">{promise.year}</span>
                    <span title="runtime">{promise.runtime} min</span>
                  </div>
                </div>

                <span>
                  <p>{promise.description}</p>
                </span>
              </div>
            )}
          </Await>
        </React.Suspense>
      </div>
    </>
  );
}

export default MovieDetails;

import {
  Await,
  NavLink,
  useLoaderData,
  useLocation,
  useSearchParams,
} from 'react-router';
import './index.css';
import React from 'react';
import Loader from '../Loader';
import type { ApiMovieDetails } from '../../App';

function MovieDetails() {
  const [params] = useSearchParams();
  const promise = useLoaderData<Promise<ApiMovieDetails>>();
  const location = useLocation();

  const newQuery = new URLSearchParams(params);
  newQuery.delete('details');

  return (
    <>
      <NavLink to={{ search: newQuery.toString() }} className="sticky">
        &larr; Back
      </NavLink>

      <div className="flex-child-container details" data-testid="movie-details">
        <React.Suspense
          fallback={<Loader className="container center" />}
          key={location.key}
        >
          <Await resolve={promise}>
            {(promise) => (
              <div className="details-column">
                <div className="flex-row">
                  <span className="movie-tilte" title="movie title">
                    {promise.name ? promise.name : promise.alternativeName}
                  </span>
                  <span
                    className="rating-border"
                    aria-label="rating"
                    title="rating"
                  >
                    {promise.rating.kp
                      ? promise.rating.kp
                      : promise.rating.imdb}
                  </span>
                </div>
                <div className="card flex-child-container center">
                  <img
                    src={
                      promise.poster.previewUrl
                        ? promise.poster.previewUrl
                        : promise.poster.url
                    }
                  />
                  <span>
                    {promise.genres
                      .map((g: { name: string }) => g.name)
                      .join(', ')}
                  </span>
                  <div className="flex-child-container flex-row timings">
                    <span title="release year">{promise.year}</span>
                    <span title="runtime">{promise.movieLength} min</span>
                  </div>
                </div>

                <span>
                  <p title="description">
                    {promise.description
                      ? promise.description
                      : promise.shortDescription}
                  </p>
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

import { NavLink, useSearchParams } from 'react-router';
import './index.css';
import Loader from '../Loader';
import { useGetMovieDetailsQuery } from '../../common/moviesApi';
import { ErrorMessage } from '../common';
import Image from 'next/image';

function MovieDetails() {
  const [params] = useSearchParams();
  const movieId = params.get('details') ?? '';
  const { currentData, isFetching, error } = useGetMovieDetailsQuery(movieId);

  const newQuery = new URLSearchParams(params);
  newQuery.delete('details');

  if (isFetching && !currentData) {
    return <Loader className="container center" />;
  }

  return (
    <>
      <NavLink to={{ search: newQuery.toString() }} className="sticky">
        &larr; Back
      </NavLink>
      {currentData ? (
        <div
          className="flex-child-container details"
          data-testid="movie-details"
        >
          <div className="details-column">
            <div className="flex-row">
              <span className="movie-tilte" title="movie title">
                {currentData.name
                  ? currentData.name
                  : currentData.alternativeName}
              </span>
              <span
                className="rating-border"
                aria-label="rating"
                title="rating"
              >
                {currentData.rating.kp
                  ? currentData.rating.kp
                  : currentData.rating.imdb}
              </span>
            </div>
            <div className="card flex-child-container center">
              <Image
                alt="Movie poster"
                src={
                  currentData.poster.previewUrl
                    ? currentData.poster.previewUrl
                    : currentData.poster.url
                }
              />
              <span>
                {currentData.genres
                  .map((g: { name: string }) => g.name)
                  .join(', ')}
              </span>
              <div className="flex-child-container flex-row timings">
                <span title="release year">{currentData.year}</span>
                <span title="runtime">{currentData.movieLength} min</span>
              </div>
            </div>

            <span>
              <p title="description">
                {currentData.description
                  ? currentData.description
                  : currentData.shortDescription}
              </p>
            </span>
          </div>
        </div>
      ) : error ? (
        <ErrorMessage error={error} />
      ) : null}
    </>
  );
}

export default MovieDetails;

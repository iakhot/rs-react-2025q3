import { NavLink, useSearchParams } from 'react-router';
import './index.css';
import Loader from '../Loader';
import { useGetMovieDetailsQuery } from '../../common/moviesApi';

function MovieDetails() {
  const [params] = useSearchParams();
  const movieId = params.get('details') ?? '';
  const { data, isLoading } = useGetMovieDetailsQuery(movieId);

  const newQuery = new URLSearchParams(params);
  newQuery.delete('details');

  return (
    <>
      {isLoading ? (
        <Loader className="container center" />
      ) : data ? (
        <>
          <NavLink to={{ search: newQuery.toString() }} className="sticky">
            &larr; Back
          </NavLink>

          <div
            className="flex-child-container details"
            data-testid="movie-details"
          >
            <div className="details-column">
              <div className="flex-row">
                <span className="movie-tilte" title="movie title">
                  {data.name ? data.name : data.alternativeName}
                </span>
                <span
                  className="rating-border"
                  aria-label="rating"
                  title="rating"
                >
                  {data.rating.kp ? data.rating.kp : data.rating.imdb}
                </span>
              </div>
              <div className="card flex-child-container center">
                <img
                  src={
                    data.poster.previewUrl
                      ? data.poster.previewUrl
                      : data.poster.url
                  }
                />
                <span>
                  {data.genres.map((g: { name: string }) => g.name).join(', ')}
                </span>
                <div className="flex-child-container flex-row timings">
                  <span title="release year">{data.year}</span>
                  <span title="runtime">{data.movieLength} min</span>
                </div>
              </div>

              <span>
                <p title="description">
                  {data.description ? data.description : data.shortDescription}
                </p>
              </span>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default MovieDetails;

import './index.css';
import Image from 'next/image';
import type { ApiMovieDetails } from 'common/types';
import Link from 'next/link';

function MovieDetails({
  details,
  params,
}: {
  details: ApiMovieDetails;
  params: URLSearchParams;
}) {
  const getBackURL = () => {
    const newQuery = new URLSearchParams(params);
    newQuery.delete('details');
    return newQuery.toString();
  };

  return (
    <>
      <Link href={{ search: getBackURL() }} className="sticky">
        &larr; Back
      </Link>
      {details ? (
        <div
          className="flex-child-container details"
          data-testid="movie-details"
        >
          <div className="details-column">
            <div className="flex-row">
              <span className="movie-title" title="movie title">
                {details.name ? details.name : details.alternativeName}
              </span>
              <span
                className="rating-border"
                aria-label="rating"
                title="rating"
              >
                {details.rating.kp ? details.rating.kp : details.rating.imdb}
              </span>
            </div>
            <div className="card flex-child-container center">
              <div className="poster-container">
                <Image
                  alt="Movie poster"
                  src={
                    details.poster.previewUrl
                      ? details.poster.previewUrl
                      : details.poster.url
                  }
                  width={300}
                  height={400}
                />
              </div>
              <span>
                {details.genres.map((g: { name: string }) => g.name).join(', ')}
              </span>
              <div className="flex-child-container flex-row timings">
                <span title="release year">{details.year}</span>
                <span title="runtime">{details.movieLength} min</span>
              </div>
            </div>

            <span>
              <p title="description">
                {details.description
                  ? details.description
                  : details.shortDescription}
              </p>
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default MovieDetails;

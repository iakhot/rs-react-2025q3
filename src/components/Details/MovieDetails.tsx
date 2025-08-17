import './index.css';
import Image from 'next/image';
import type { ApiMovieDetails } from '@/common/types';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('MovieDetails');

  return (
    <>
      <Link href={{ search: getBackURL() }} className="sticky">
        &larr; {t('back')}
      </Link>
      {details ? (
        <div
          className="flex-child-container details"
          data-testid="movie-details"
        >
          <div className="details-column">
            <div className="flex-row">
              <span className="movie-title" title={t('title')}>
                {details.name ? details.name : details.alternativeName}
              </span>
              <span
                className="rating-border"
                aria-label="rating"
                title={t('rating')}
              >
                {details.rating.kp ? details.rating.kp : details.rating.imdb}
              </span>
            </div>
            <div className="card flex-child-container center">
              <div className="poster-container">
                <Image
                  alt={t('posterImgAlt')}
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
                <span title={t('releaseYear')}>{details.year}</span>
                <span title={t('runtime')}>{details.movieLength} min</span>
              </div>
            </div>

            <span>
              <p title={t('description')}>
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

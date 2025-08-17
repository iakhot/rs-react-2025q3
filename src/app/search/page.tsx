import { fetchDetails } from './action';
import MovieDetails from 'components/Details';
import type { ApiMovieDetails } from 'common/types';
import SearchResult from 'components/SearchResult';

export interface SearchParamsType {
  details?: number;
  page?: number;
  query?: string;
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: URLSearchParams;
}) {
  const params = await searchParams;
  const movieId = (params as SearchParamsType).details;
  let movie = {};
  if (movieId) {
    movie = await fetchDetails(+movieId);
  }

  return (
    <>
      <SearchResult>
        {movie ? (
          <MovieDetails details={movie as ApiMovieDetails} params={params} />
        ) : null}
      </SearchResult>
    </>
  );
}

import type { ApiError, ApiMovie, Movie } from '../App';
import { apiUrl } from './axiosService';

export const composeErrorMessage = (error: ApiError): string => {
  if (error.status) {
    const status = error.status;
    const message = `${status} ${error.statusText}`;
    return status >= 500
      ? `Server side error: ${message}`
      : status >= 400
        ? `Client side error: ${message}`
        : `${message}`;
  } else return error.message;
};

export const convertData = (results: ApiMovie[]): Movie[] => {
  return results.map((movie) => {
    return {
      id: movie.id,
      name: movie.name ? movie.name : movie.alternativeName,
      description: movie.description
        ? movie.description
        : movie.shortDescription,
    } as Movie;
  });
};

const getDetailsUrl = (movieId: number) => {
  return `${apiUrl}/movie/${movieId}`;
};

export const formatCsv = (movies: Movie[]) => {
  const headers = [...Object.keys(movies[0]), 'detailsURL'].join(',');
  const rows = movies.map((movie) =>
    [...Object.values(movie), getDetailsUrl(movie.id)].join(',')
  );
  return [headers, ...rows].join('\n');
};

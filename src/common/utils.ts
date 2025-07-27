import type { ApiError, ApiMovie, Movie, MovieDetails } from '../App';

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

export const convertDetails = (data: object): MovieDetails => {
  return {
    id: data.id,
    name: data.name ? data.name : data.alternativeName,
    year: data.year ? data.year : '',
    posterURL: data.poster?.previewUrl,
    rating: data.rating.kp ? data.rating.kp : data.rating.imdb,
    genres: data.genres.map((g) => g.name).join(', '),
    runtime: data.movieLength,
    description: data.description ? data.description : data.shortDescription,
  };
};

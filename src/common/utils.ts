import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { ApiMovie, ApiMovieDetails, Movie } from '../common/types';
import type { SerializedError } from '@reduxjs/toolkit/react';

export const ErrorString = {
  SERVER_ERROR: 'Server side error',
  CLIENT_ERROR: 'Client side error',
  UNEXPECTED_ERROR: 'Unexpected Error',
};

export const composeErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string | undefined => {
  if ('status' in error) {
    const status = error.status;
    switch (true) {
      case +error.status >= 500:
        console.error(ErrorString.SERVER_ERROR, JSON.stringify(error.data));
        return `${ErrorString.SERVER_ERROR}: ${
          (error.data as { message: string })?.message
        }`;
      case +error.status >= 400:
        console.error(ErrorString.CLIENT_ERROR, JSON.stringify(error.data));
        return `${ErrorString.CLIENT_ERROR}: ${(error.data as { message: string })?.message} `;
      case typeof status === 'string':
        console.error(error.status, JSON.stringify(error.data));
        return `${error.status} ${error.error} `;
    }
  } else {
    console.error(ErrorString.UNEXPECTED_ERROR, error.message);
    return `${ErrorString.UNEXPECTED_ERROR}: ${error.message} `;
  }
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

export const convertMovieDetails = (
  movie: ApiMovieDetails
): ApiMovieDetails => {
  return {
    id: movie.id,
    name: movie.name ? movie.name : movie.alternativeName,
    description: movie.description ? movie.description : movie.shortDescription,
    rating: movie.rating,
    genres: movie.genres,
    year: movie.year,
    movieLength: movie.movieLength,
  } as ApiMovieDetails;
};

export const saveFileDialog = async (content: Blob, filename: string) => {
  if (window.showSaveFilePicker) {
    const opts: SaveFilePickerOptions = {
      suggestedName: filename,
      types: [
        {
          description: 'Text file',
          accept: { 'text/csv': ['.csv'] },
        },
      ],
    };
    let writable = null;
    try {
      const handle = await window.showSaveFilePicker(opts);
      writable = await handle.createWritable();
      await writable.write(content);
    } catch (error) {
      console.log(`An error occurred downloading a file: ${error}`);
      return null;
    } finally {
      writable?.close();
    }
  } else {
    console.log('File download is not supported by your browser.');
  }
};

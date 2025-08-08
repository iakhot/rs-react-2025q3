import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { ApiMovie, Movie } from '../common/types';
import { apiUrl } from './moviesApi';
import type { SerializedError } from '@reduxjs/toolkit/react';

const ErrorString = {
  SERVER_ERROR: 'Server side error',
  CLIENT_ERROR: 'Client side error',
  UNEXPECTED_ERROR: 'Unexpected Error',
};

export const composeErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string | undefined => {
  console.log(`============ TEST ===== ${error}`);
  if ('status' in error) {
    const status = error.status;
    switch (true) {
      case +error.status >= 500:
        console.error(ErrorString.SERVER_ERROR, JSON.stringify(error.data));
        return `${ErrorString.SERVER_ERROR}: ${error.data?.message}`;
      case +error.status >= 400:
        console.error(ErrorString.CLIENT_ERROR, JSON.stringify(error.data));
        return `Client side error: ${error.data?.message}`;
      case typeof status === 'string':
        console.error(error.status, JSON.stringify(error.data));
        return `${error.status} ${error.error}`;
    }
  } else {
    console.error(ErrorString.UNEXPECTED_ERROR, error.message);
    return `${ErrorString.UNEXPECTED_ERROR}: ${error.message}`;
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

const getDetailsUrl = (movieId: number) => {
  return `${apiUrl}/${movieId}`;
};

export const formatCsv = (movies: Movie[]) => {
  const headers = [...Object.keys(movies[0]), 'detailsURL'].join(',');
  const rows = movies.map((movie) =>
    [...Object.values(movie), getDetailsUrl(movie.id)].join(',')
  );
  return [headers, ...rows].join('\n');
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

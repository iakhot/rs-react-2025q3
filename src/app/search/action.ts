'use server';
import { apiUrl, token } from 'common/moviesApi';
import type { ApiMovieDetails } from 'common/types';
import { convertMovieDetails } from 'common/utils';

const getDetailsUrl = (movieId: number) => {
  return `${apiUrl}/${movieId}`;
};

const formatCsv = (movies: ApiMovieDetails[]) => {
  const headers = [...Object.keys(movies[0]), 'detailsURL'].join(',');
  const rows = movies.map((movie) => {
    const values = Object.values(movie).map((v) => {
      return v instanceof Object ? JSON.stringify(v) : v;
    });
    return [...values, getDetailsUrl(movie.id)].join(',');
  });
  return [headers, ...rows].join('\n');
};

export const fetchDetails = async (id: number): Promise<Response> => {
  return fetch(getDetailsUrl(id), {
    headers: {
      'X-API-KEY': token,
    },
  })
    .then((res) => res.json())
    .catch(console.log);
};

export async function createCSVBlob(ids: number[]): Promise<Blob | null> {
  const movies: ApiMovieDetails[] = [];
  const promises: Promise<Response>[] = [];
  if (ids.length > 0) {
    ids.forEach((id) => {
      const req = fetchDetails(id);
      promises.push(req);
    });
  }
  if (promises.length > 0) {
    await Promise.allSettled(promises).then((values) => {
      values.forEach((res) => {
        if (res.status === 'fulfilled') {
          const details = convertMovieDetails(res.value as ApiMovieDetails);
          movies.push(details);
        } else {
          console.log(`Failed to load details: ${res.reason}`);
        }
      });
    });
  }

  if (movies.length > 0) {
    const content = formatCsv(movies);
    const blob = new Blob([content], {
      type: 'text/plain;charset=utf-8',
    });
    return blob;
  }
  return null;
}

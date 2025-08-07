import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  type ApiMovieDetails,
  type ApiResult,
  type SearchQueryArgs,
} from './types';

export const apiUrl = 'https://api.kinopoisk.dev/v1.4/movie';
const token = 'CZA38XR-FRA4EH3-KAPJRZ8-C3S9DZ8';

export const api = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    prepareHeaders: (headers) => {
      if (token) {
        headers.set('X-API-KEY', `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Movies'],
  endpoints: (build) => ({
    getMovies: build.query<ApiResult, SearchQueryArgs>({
      query: ({ searchTerm = '', pageNumber = 1, limit = 5 }) =>
        `/search?query=${searchTerm}&page=${pageNumber}&limit=${limit}`,
    }),
    getMovieDetails: build.query<ApiMovieDetails, string>({
      query: (id) => `/${id}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetMovieDetailsQuery } = api;

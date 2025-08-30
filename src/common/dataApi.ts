import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUrl =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/';
export const api = createApi({
  reducerPath: 'dataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    referrer: '',
  }),
  tagTypes: ['CO2-emissions'],
  endpoints: (build) => ({
    getData: build.query<any, void>({
      query: () => `owid-co2-data.json`,
    }),
  }),
});

export const { useGetDataQuery } = api;

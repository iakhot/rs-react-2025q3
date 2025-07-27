import { createBrowserRouter, redirect } from 'react-router';
import App from './App';
import axiosService from './common/axiosService';
import SearchResult from './components/SearchResult';
import { ErrorMessage } from './components/common';
import MovieDetails from './Details';
import Search from './components/Search';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/movies'),
  },
  {
    path: '/movies',
    Component: App,
    children: [
      { index: true, Component: Search },
      {
        path: 'search',
        Component: SearchResult,
        loader: ({ request }) => {
          const url = new URL(request.url);
          const query = url.searchParams.get('page');
          const page = query ? Number(query) : 1;
          const term = url.searchParams.get('query') ?? '';
          const res = axiosService.getMovies({
            searchTerm: term,
            pageNumber: page,
          });
          const promise = new Promise((resolve) => {
            setTimeout(() => resolve(res), 1000);
          });
          return { promise };
        },
        errorElement: <ErrorMessage className="card min-vh70" />,
        children: [
          {
            path: '',
            Component: MovieDetails,
            loader: async ({ request }) => {
              const url = new URL(request.url);
              const query = url.searchParams.get('details');
              if (query) {
                const res = axiosService.getMovieDetails({
                  id: query,
                });
                const promise = new Promise((resolve) => {
                  setTimeout(() => resolve(res), 1000);
                });
                return { promise };
              }
              return new Promise((reject) => reject('Movie Id is missing.'));
            },
          },
        ],
      },
    ],
  },
]);

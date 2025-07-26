import { createBrowserRouter, redirect } from 'react-router';
import App from './App';
import axiosService from './common/axiosService';
import SearchResult from './components/SearchResult';
import { ErrorMessage } from './components/common';

export const router = createBrowserRouter([
  {
    path: '/',
    loader: () => redirect('/movies'),
  },
  {
    path: '/movies',
    Component: App,
    children: [
      {
        path: 'search',
        Component: SearchResult,
        loader: async ({ request }) => {
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
      },
    ],
  },
]);

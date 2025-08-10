import { createBrowserRouter, redirect } from 'react-router';
import App from './App';
import SearchResult from './components/SearchResult';
import { NotFound } from './components/common';
import MovieDetails from './components/Details';

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
        children: [
          {
            path: '',
            Component: MovieDetails,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    Component: NotFound,
  },
]);

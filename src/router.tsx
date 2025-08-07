import { createBrowserRouter, redirect } from 'react-router';
import App from './App';
import SearchResult from './components/SearchResult';
import { NotFound } from './components/common';
import MovieDetails from './components/Details';
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

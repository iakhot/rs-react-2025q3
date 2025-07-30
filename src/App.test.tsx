import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { moviesMock } from './__tests__/mocks';
import { renderAsync } from './__tests__/setupTests';
import { createMemoryRouter, RouterProvider } from 'react-router';
import SearchResult from './components/SearchResult';
import { ErrorMessage } from './components/common';
import Search from './components/Search';

describe('App ', () => {
  it('renders correctly', async () => {
    const promise = Promise.resolve(moviesMock);
    const RouterMock = createMemoryRouter(
      [
        {
          path: '/movies',
          Component: App,
          children: [
            { index: true, Component: Search },
            {
              path: 'search',
              Component: SearchResult,
              loader: () => ({ promise }),
              errorElement: <ErrorMessage className="card min-vh70" />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/movies'],
      }
    );
    await renderAsync(<RouterProvider router={RouterMock} />);
    const length = moviesMock.docs.length;

    expect(() => render(<App />)).not.toThrow();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getAllByTestId('card-name')).toHaveLength(length);
      expect(screen.getAllByTestId('card-description')).toHaveLength(length);
    });
  });
  it('renders loading', async () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve(moviesMock), 500)
    );
    const RouterMock = createMemoryRouter(
      [
        {
          path: '/movies',
          Component: App,
          children: [
            { index: true, Component: Search },
            {
              path: 'search',
              Component: SearchResult,
              loader: () => ({ promise }),
              errorElement: <ErrorMessage className="card min-vh70" />,
            },
          ],
        },
      ],
      {
        initialEntries: ['/movies'],
      }
    );
    await renderAsync(<RouterProvider router={RouterMock} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});

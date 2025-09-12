import { screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';
import { moviesMock } from './__tests__/mocks';
import { renderWithProviders } from './__tests__/setupTests';
import { createMemoryRouter, RouterProvider } from 'react-router';
import SearchResult from './components/SearchResult';

const RouterMock = createMemoryRouter(
  [
    {
      path: '/movies',
      Component: App,
      children: [
        {
          path: 'search',
          Component: SearchResult,
        },
      ],
    },
  ],
  {
    initialEntries: ['/movies'],
  }
);

describe('App ', () => {
  it('renders correctly', async () => {
    renderWithProviders(<RouterProvider router={RouterMock} />);
    const length = moviesMock.docs.length;

    await waitFor(() => {
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('search-button')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getAllByTestId('card-name')).toHaveLength(length);
      expect(screen.getAllByTestId('card-description')).toHaveLength(length);
    });
  });
  it('renders loading', async () => {
    renderWithProviders(<RouterProvider router={RouterMock} />);
    waitFor(() => {
      expect(screen.getByTestId('loader')).toBeInTheDocument();
    });
  });
});

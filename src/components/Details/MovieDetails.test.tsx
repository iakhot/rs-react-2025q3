import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { RouterProvider, useSearchParams } from 'react-router';
import {
  mockMemoryRouter,
  renderWithProviders,
} from '../../__tests__/setupTests';
import MovieDetails from './MovieDetails';
import { detailsApiMock } from '../../__tests__/mocks';
import { ErrorString } from '../../common/utils';

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

describe('MovieDetails', () => {
  it('renders details successfully', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('details=333'),
      vi.fn(),
    ]);
    const RouterMock = mockMemoryRouter('/search', <MovieDetails />);
    renderWithProviders(<RouterProvider router={RouterMock} />);

    await waitFor(() => {
      expect(screen.getByTestId('movie-details')).toBeInTheDocument();
      expect(screen.getByTitle('movie title')).toHaveTextContent(
        detailsApiMock.name
      );
      expect(screen.getByTitle('rating')).toHaveTextContent(
        String(detailsApiMock.rating.kp)
      );
      expect(screen.getByTitle('release year')).toHaveTextContent(
        String(detailsApiMock.year)
      );
      expect(screen.getByTitle('runtime')).toHaveTextContent(
        String(detailsApiMock.movieLength)
      );
      expect(screen.getByTitle('description')).toHaveTextContent(
        detailsApiMock.description
      );
      expect(screen.getByRole('img')).toBeInTheDocument();
    });
  });
  it('renders error if movie is missing', async () => {
    vi.mocked(useSearchParams).mockReturnValue([
      new URLSearchParams('details=123'),
      vi.fn(),
    ]);
    const RouterMock = mockMemoryRouter('/search', <MovieDetails />);
    renderWithProviders(<RouterProvider router={RouterMock} />);

    await waitFor(() => {
      const errorMsg = screen.getByTestId('api-error');
      expect(errorMsg).toHaveAttribute(
        'class',
        expect.stringContaining('warning')
      );
      expect(errorMsg.textContent).toContain(
        `An error has occurred while loading the data:${ErrorString.CLIENT_ERROR}: Not found`
      );
    });
  });
});

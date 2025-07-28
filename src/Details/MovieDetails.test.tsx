import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { RouterProvider } from 'react-router';
import { mockMemoryRouter, renderAsync } from '../__tests__/setupTests';
import MovieDetails from './MovieDetails';
import { detailsApiMock } from '../__tests__/mocks';

describe('MovieDetails', () => {
  it('renders details successfully', async () => {
    const RouterMock = mockMemoryRouter('/search', <MovieDetails />, () =>
      Promise.resolve(detailsApiMock)
    );
    await renderAsync(<RouterProvider router={RouterMock} />);
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

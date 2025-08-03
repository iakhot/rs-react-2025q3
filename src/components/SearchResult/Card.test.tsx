import { screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Card from './Card';
import { movieStub } from '../../__tests__/mocks';
import type { Movie } from '../../App';
import {
  createRouteStub,
  renderWithProviders,
} from '../../__tests__/setupTests';
import { useAppDispatch, useTheme } from '../../common/hooks';

vi.mock('../../common/hooks');
const mockDispatch = vi.mocked(useAppDispatch);
const mockTheme = vi.mocked(useTheme);
beforeEach(() => {
  mockTheme.mockReturnValueOnce({
    currentTheme: 'dark',
    handleThemeSwitch: vi.fn(),
  });
});

describe('Card', () => {
  it('renders correctly with data', () => {
    const RouteStub = createRouteStub(
      '/search',
      <Card movie={movieStub} selected={false} />
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />);
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      movieStub.description
    );
    expect(screen.getByTestId('card-name')).toHaveTextContent(movieStub.name);
  });
  it('renders correctly with empty data', () => {
    const movieStub: Movie = {
      id: 123,
      name: '',
      description: '',
    };

    const RouteStub = createRouteStub(
      '/search',
      <Card movie={movieStub} selected={false} />
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />);
    expect(screen.getByTestId('card-description')).toHaveTextContent('...');
    expect(screen.getByTestId('card-name')).toHaveTextContent('...');
  });
  it('renders selected items', () => {
    const RouteStub = createRouteStub(
      '/search',
      <Card movie={movieStub} selected={true} />
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />);
    expect(screen.getByTitle('movie-selected')).toBeChecked();
  });
  it('triggers select action', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <Card movie={movieStub} selected={false} />
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />
    );
    await user.click(screen.getByTitle('movie-selected'));
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: movieStub,
        type: 'selectedMovies/selectMovie',
      });
    });
  });
  it('triggers unselect action', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <Card movie={movieStub} selected={false} />
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />
    );
    await user.click(screen.getByTitle('movie-selected'));
    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: movieStub.id,
        type: 'selectedMovies/unselectMovie',
      });
    });
  });
});

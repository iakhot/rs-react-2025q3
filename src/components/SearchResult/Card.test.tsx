import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Card from './Card';
import { movieStub } from '../../__tests__/mocks';
import type { Movie } from '../../common/types';
import {
  createRouteStub,
  renderWithProviders,
} from '../../__tests__/setupTests';

const mockDispatch = vi.fn();
vi.mock('../../common/hooks', async () => {
  const actual = await vi.importActual('../../common/hooks');
  return {
    ...actual,
    useAppDispatch: vi.fn(() => mockDispatch),
  };
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
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: movieStub,
        type: 'selectedMovies/selectMovie',
      });
    });
  });
  it('triggers unselect action', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <Card movie={movieStub} selected={true} />
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />
    );
    await user.click(screen.getByTitle('movie-selected'));
    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        payload: movieStub.id,
        type: 'selectedMovies/unselectMovie',
      });
    });
  });
});

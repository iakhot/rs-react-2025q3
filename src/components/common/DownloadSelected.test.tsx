import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DownloadSelected } from './DownloadSelected';
import { moviesList } from '../../__tests__/mocks';
import {
  createRouteStub,
  renderWithProviders,
} from '../../__tests__/setupTests';
import { useAppDispatch } from '../../common/hooks';

vi.mock('../../common/utils', () => ({
  saveFileDialog: vi.fn(),
}));
const { saveFileDialog } = vi.mocked(await import('../../common/utils'));

vi.mock('../../common/hooks.ts');
const mockDispatch = vi.mocked(useAppDispatch);

describe('DownloadSelected', () => {
  it('renders correctly with data', () => {
    const RouteStub = createRouteStub(
      '/search',
      <DownloadSelected hidden={false} />
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />, {
      preloadedState: { selectedMovies: { selectedMovies: moviesList } },
    });
    waitFor(() => {
      expect(screen.getByTestId('download-selected')).toBeInTheDocument();
      expect(
        screen.getByText(`${moviesList.length} movies selected`)
      ).toBeInTheDocument();
      expect(screen.queryByText('Unselect all')).toBeInTheDocument();
      expect(screen.queryByText('Download')).toBeInTheDocument();
    });
  });
  it('renders hidden when no data', () => {
    const RouteStub = createRouteStub(
      '/search',
      <DownloadSelected hidden={true} />
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />, {
      preloadedState: { selectedMovies: { selectedMovies: [] } },
    });

    waitFor(() => {
      expect(screen.getByTestId('download-selected')).toHaveAttribute(
        'style',
        expect.stringContaining('hidden')
      );
      expect(screen.queryByText('Unselect all')).toBeNull();
      expect(screen.queryByText('Download')).toBeNull();
    });
  });
  it('triggers download', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <DownloadSelected hidden={false} />
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />,
      {
        preloadedState: { selectedMovies: { selectedMovies: moviesList } },
      }
    );

    await user.click(screen.getByRole('button', { name: 'Download' }));

    waitFor(() => {
      expect(saveFileDialog).toHaveBeenCalledWith(
        new Blob(),
        `${moviesList.length}_best_movies.csv`
      );
    });
  });
  it('triggers unselect all', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <DownloadSelected hidden={false} />
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />,
      {
        preloadedState: { selectedMovies: { selectedMovies: moviesList } },
      }
    );

    await user.click(screen.getByRole('button', { name: 'Unselect all' }));

    waitFor(() => {
      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'selectedMovies/unselectAll',
        payload: undefined,
      });
    });
  });
});

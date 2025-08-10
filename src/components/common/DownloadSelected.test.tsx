import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DownloadSelected } from './DownloadSelected';
import { moviesList } from '../../__tests__/mocks';
import {
  createRouteStub,
  renderWithProviders,
} from '../../__tests__/setupTests';
import ThemeContextProvider from '../../context/ThemeContext';

vi.mock('../../common/utils', () => ({
  saveFileDialog: vi.fn(),
  formatCsv: vi.fn(),
}));
const { saveFileDialog } = vi.mocked(await import('../../common/utils'));

const spyDispatch = vi.fn();
vi.mock('../../common/hooks.ts', async () => {
  const actual = await vi.importActual('../../common/hooks.ts');
  return {
    ...actual,
    useAppDispatch: vi.fn(() => spyDispatch),
  };
});

describe('DownloadSelected', () => {
  it('renders correctly with data', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <ThemeContextProvider>
        <DownloadSelected hidden={false} />
      </ThemeContextProvider>
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />, {
      preloadedState: { selectedMovies: { selectedMovies: moviesList } },
    });
    await waitFor(() => {
      expect(screen.getByTestId('download-selected')).toBeInTheDocument();
      expect(
        screen.getByText(`${moviesList.length} movies selected`)
      ).toBeInTheDocument();
      expect(screen.queryByText('Unselect all')).toBeInTheDocument();
      expect(screen.queryByText('Download')).toBeInTheDocument();
    });
  });
  it('renders hidden when no data', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <ThemeContextProvider>
        <DownloadSelected hidden={true} />
      </ThemeContextProvider>
    );
    renderWithProviders(<RouteStub initialEntries={['/search']} />, {
      preloadedState: { selectedMovies: { selectedMovies: [] } },
    });

    await waitFor(() => {
      expect(screen.getByTestId('download-selected')).toHaveAttribute(
        'style',
        expect.stringContaining('hidden')
      );
    });
  });
  it('triggers download', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <ThemeContextProvider>
        <DownloadSelected hidden={false} />
      </ThemeContextProvider>
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />,
      {
        preloadedState: { selectedMovies: { selectedMovies: moviesList } },
      }
    );

    await user.click(screen.getByRole('button', { name: 'Download' }));

    await waitFor(() => {
      expect(saveFileDialog).toHaveBeenCalledWith(
        new Blob(),
        `${moviesList.length}_best_movies.csv`
      );
    });
  });
  it('triggers unselect all', async () => {
    const RouteStub = createRouteStub(
      '/search',
      <ThemeContextProvider>
        <DownloadSelected hidden={false} />
      </ThemeContextProvider>
    );
    const { user } = renderWithProviders(
      <RouteStub initialEntries={['/search']} />,
      {
        preloadedState: { selectedMovies: { selectedMovies: moviesList } },
      }
    );

    await user.click(screen.getByRole('button', { name: 'Unselect all' }));

    await waitFor(() => {
      expect(spyDispatch).toHaveBeenCalledWith({
        type: 'selectedMovies/unselectAll',
      });
    });
  });
});

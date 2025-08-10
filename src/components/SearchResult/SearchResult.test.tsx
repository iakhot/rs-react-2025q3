import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { moviesMock } from '../../__tests__/mocks';
import SearchResult from './SearchResult';
import { RouterProvider } from 'react-router';
import {
  mockMemoryRouter,
  renderAsync,
  renderWithProviders,
  server,
} from '../../__tests__/setupTests';
import { setupStore } from '../../common/store';
import { Provider } from 'react-redux';
import { http, HttpResponse } from 'msw';
import { apiUrl } from '../../common/moviesApi';
import { ErrorString } from '../../common/utils';

describe('SearchResult', () => {
  it('renders results if successful', async () => {
    const RouterMock = mockMemoryRouter('/search', <SearchResult />);
    renderWithProviders(<RouterProvider router={RouterMock} />);

    await waitFor(() => {
      expect(screen.getByTestId('search-result')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      const length = moviesMock.docs.length;
      const names = screen.getAllByTestId('card-name');
      const descriptions = screen.getAllByTestId('card-description');
      expect(names).toHaveLength(length);
      expect(descriptions).toHaveLength(length);
    });
  });
  it('displays loader while fetching', async () => {
    const RouterMock = mockMemoryRouter('/search', <SearchResult />);
    renderWithProviders(<RouterProvider router={RouterMock} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('displays warning on error', async () => {
    const status = 'FETCH_ERROR';
    const message = 'TypeError: Failed to fetch';
    server.use(
      http.get(`${apiUrl}/search`, () => {
        return HttpResponse.error();
      })
    );
    const RouterMock = mockMemoryRouter('/search', <SearchResult />);
    renderWithProviders(<RouterProvider router={RouterMock} />);
    await waitFor(() => {
      const errorMsg = screen.getByTestId('api-error');
      expect(errorMsg).toHaveAttribute(
        'class',
        expect.stringContaining('warning')
      );
      expect(errorMsg.textContent).toContain(
        `An error has occurred while loading the data:${status} ${message}`
      );
    });
  });
  it('displays warning on 500 error', async () => {
    const status = 500;
    const message = 'Internal Server error';
    server.use(
      http.get(`${apiUrl}/search`, () => {
        return HttpResponse.json({ message: message }, { status: status });
      })
    );

    const RouterMock = mockMemoryRouter('/search', <SearchResult />);
    renderWithProviders(<RouterProvider router={RouterMock} />);
    await waitFor(() => {
      const errorMsg = screen.getByTestId('api-error');
      expect(errorMsg).toHaveAttribute(
        'class',
        expect.stringContaining('warning')
      );
      expect(errorMsg.textContent).toContain(
        `An error has occurred while loading the data:${ErrorString.SERVER_ERROR}: ${message}`
      );
    });
  });
  it('displays warning on 400 error', async () => {
    const status = 404;
    const message = 'Not found';
    server.use(
      http.get(`${apiUrl}/search`, () => {
        return HttpResponse.json({ message: message }, { status: status });
      })
    );

    const RouterMock = mockMemoryRouter('/search', <SearchResult />);
    await renderAsync(
      <Provider store={setupStore()}>
        <RouterProvider router={RouterMock} />
      </Provider>
    );
    await waitFor(() => {
      const errorMsg = screen.getByTestId('api-error');
      expect(errorMsg).toHaveAttribute(
        'class',
        expect.stringContaining('warning')
      );
      expect(errorMsg.textContent).toContain(
        `An error has occurred while loading the data:${ErrorString.CLIENT_ERROR}: ${message}`
      );
    });
  });
});

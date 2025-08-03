import { screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { moviesMock } from '../../__tests__/mocks';
import SearchResult from './SearchResult';
import { RouterProvider } from 'react-router';
import { mockMemoryRouter, renderAsync } from '../../__tests__/setupTests';
import { setupStore } from '../../common/store';
import { Provider } from 'react-redux';
import { ApiError } from '../../App';

const mockLoaderData = vi.fn();

describe('SearchResult', () => {
  it('renders results if successful', async () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve(moviesMock), 500)
    );
    mockLoaderData.mockReturnValueOnce({ promise });
    const RouterMock = mockMemoryRouter(
      '/search',
      <SearchResult />,
      mockLoaderData
    );
    const store = setupStore();
    await renderAsync(
      <Provider store={store}>
        <RouterProvider router={RouterMock} />
      </Provider>
    );
    expect(screen.getByTestId('search-result')).toBeInTheDocument();
    waitFor(() => {
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
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve(moviesMock), 500)
    );
    mockLoaderData.mockReturnValueOnce({ promise });
    const RouterMock = mockMemoryRouter(
      '/search',
      <SearchResult />,
      mockLoaderData
    );
    await renderAsync(<RouterProvider router={RouterMock} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('displays warning on error', async () => {
    const message = 'Failed to load results';
    const promise = Promise.reject(new Error(message));
    await expect(promise).rejects.toThrow();
    mockLoaderData.mockReturnValueOnce({ promise });
    const RouterMock = mockMemoryRouter(
      '/search',
      <SearchResult />,
      mockLoaderData
    );
    await renderAsync(<RouterProvider router={RouterMock} />);
    const errorMsg = screen.getByTestId('api-error');
    expect(errorMsg).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
    expect(errorMsg.textContent).toContain(
      `An error has occurred while loading the data:${message}`
    );
  });
  it('displays warning on 500 error', async () => {
    const error: ApiError = {
      status: 500,
      statusText: 'Internal Server error',
      name: '',
      message: '',
    };

    const promise = Promise.reject(new ApiError(error));
    await expect(promise).rejects.toThrow();
    mockLoaderData.mockReturnValueOnce({ promise });
    const RouterMock = mockMemoryRouter(
      '/search',
      <SearchResult />,
      mockLoaderData
    );
    await renderAsync(<RouterProvider router={RouterMock} />);

    const errorMsg = screen.getByTestId('api-error');
    expect(errorMsg).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
    expect(errorMsg.textContent).toContain(
      `An error has occurred while loading the data:Server side error: ${error.status} ${error.statusText}`
    );
  });
  it('displays warning on 400 error', async () => {
    const error: ApiError = {
      status: 404,
      statusText: 'Not found',
      name: '',
      message: '',
    };
    const promise = Promise.reject(new ApiError(error));
    await expect(promise).rejects.toThrow();
    mockLoaderData.mockReturnValueOnce({ promise });
    const RouterMock = mockMemoryRouter(
      '/search',
      <SearchResult />,
      mockLoaderData
    );
    await renderAsync(<RouterProvider router={RouterMock} />);
    const errorMsg = screen.getByTestId('api-error');
    expect(errorMsg).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
    expect(errorMsg.textContent).toContain(
      `An error has occurred while loading the data:Client side error: ${error.status} ${error.statusText}`
    );
  });
});

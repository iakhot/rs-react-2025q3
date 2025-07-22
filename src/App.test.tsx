import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';
import { mockResponse, moviesList, TOKEN_REGEX } from './__tests__/mocks';
import axios from 'axios';
import AxiosService from './common/axiosService';
import { renderAsync } from './__tests__/setupTests';

vi.mock('axios');
vi.mock('./common/axiosService');

describe('App ', () => {
  it('renders correctly', async () => {
    vi.mocked(AxiosService.getMovies).mockResolvedValue(
      mockResponse(moviesList)
    );
    const length = moviesList.length;

    expect(() => render(<App />)).not.toThrow();
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getAllByTestId('card-name')).toHaveLength(length);
      expect(screen.getAllByTestId('card-description')).toHaveLength(length);
    });
    expect(screen.getByText('Throw error')).toBeInTheDocument();
  });
  it('makes api call', async () => {
    const spyAxiosGet = vi
      .spyOn(AxiosService, 'getMovies')
      .mockResolvedValueOnce(mockResponse([]));
    await renderAsync(<App />);

    expect(spyAxiosGet).toHaveBeenCalledWith(
      expect.objectContaining({ searchTerm: '' })
    );
  });
  it('renders loading', () => {
    vi.mocked(AxiosService.getMovies).mockResolvedValueOnce(mockResponse([]));

    render(<App />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});

describe('App API integration', () => {
  it('calls API with correct params', async () => {
    vi.mocked(axios.get).mockRejectedValueOnce({});
    await renderAsync(<App />);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/movie/search?query=&limit=5&page=1'),
      expect.objectContaining({
        headers: {
          'X-API-KEY': expect.stringMatching(TOKEN_REGEX),
        },
      })
    );
  });
  it('handles successful response', async () => {
    vi.mocked(AxiosService.getMovies).mockResolvedValueOnce(
      mockResponse(moviesList)
    );
    const length = moviesList.length;

    await renderAsync(<App />);
    await waitFor(() => {
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getAllByTestId('card-name')).toHaveLength(length);
      expect(screen.getAllByTestId('card-description')).toHaveLength(length);
    });
  });
  it('handles failed response', async () => {
    const error = 'Network error';
    vi.mocked(AxiosService.getMovies).mockRejectedValueOnce(new Error(error));

    await renderAsync(<App />);
    const warning = await screen.findByTestId('api-error');
    expect(warning).toHaveTextContent(
      `An error has occurred while loading the data:${error}`
    );
  });
});

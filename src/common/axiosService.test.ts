import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import { ApiMovieStub, moviesMock, TOKEN_REGEX } from '../__tests__/mocks';
import { waitFor } from '@testing-library/dom';

vi.mock('axios');
import AxiosService from './axiosService';

beforeEach(() => {
  vi.clearAllMocks();
});

describe('Axios Service', () => {
  it('should fetch data successfully', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: moviesMock });

    const result = await AxiosService.getMovies({ searchTerm: '' });

    waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/movie/search'),
        expect.objectContaining({
          headers: {
            'X-API-KEY': expect.stringMatching(TOKEN_REGEX),
          },
        })
      );
      expect(result).toEqual(moviesMock);
    });
  });
  it('should fetch data by id', async () => {
    vi.mocked(axios.get).mockResolvedValueOnce({ data: ApiMovieStub });

    const result = await AxiosService.getMovieDetails({ id: '333' });

    waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        expect.stringContaining('/movie'),
        expect.objectContaining({
          headers: {
            'X-API-KEY': expect.stringMatching(TOKEN_REGEX),
          },
        })
      );
      expect(result).toEqual(ApiMovieStub);
    });
  });
});

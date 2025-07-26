import { describe, expect, it, vi } from 'vitest';
import axios from 'axios';
import AxiosService from './axiosService';
import { moviesList, TOKEN_REGEX } from '../__tests__/mocks';

vi.mock('axios');

describe('Axios Service', () => {
  it('should fetch data successfully', async () => {
    const mockData = { docs: moviesList };
    vi.mocked(axios.get).mockResolvedValueOnce({ data: mockData });

    const result = await AxiosService.getMovies({ searchTerm: '' });

    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/movie/search'),
      expect.objectContaining({
        headers: {
          'X-API-KEY': expect.stringMatching(TOKEN_REGEX),
        },
      })
    );
    expect(result).toEqual(mockData);
  });
});

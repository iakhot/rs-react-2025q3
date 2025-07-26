import axios, { AxiosError } from 'axios';
import { type ApiMovie, type ApiResult, type Movie, ApiError } from '../App';

const apiUrl = 'https://api.kinopoisk.dev/v1.4';
const token = 'CZA38XR-FRA4EH3-KAPJRZ8-C3S9DZ8';

interface SearchParams {
  searchTerm: string;
  limit?: number;
  pageNumber?: number;
}

class AxiosService {
  convertData = (results: ApiMovie[]): Movie[] => {
    return results.map((movie) => {
      return {
        id: movie.id,
        name: movie.name ? movie.name : movie.alternativeName,
        description: movie.description
          ? movie.description
          : movie.shortDescription,
      } as Movie;
    });
  };

  getRequest = (url: string) =>
    axios
      .get(url, {
        headers: {
          'X-API-KEY': `${token}`,
        },
      })
      .then((response) => response);

  getMovies = ({ searchTerm, limit = 5, pageNumber = 1 }: SearchParams) =>
    this.getRequest(
      `${apiUrl}/movie/search?query=${searchTerm}&limit=${limit}&page=${pageNumber}`
    )
      .then((res) => {
        const data = res?.data as ApiResult;
        const movies = this.convertData(data.docs);
        return {
          docs: movies,
          total: data.total,
          limit: data.limit,
          page: data.page,
          pages: data.pages,
        } as ApiResult;
      })
      .catch((error: AxiosError) => {
        const apiError: ApiError = {
          message: error.message,
          name: error.name,
          status: error.response?.status,
          statusText: error.response?.statusText,
        };
        throw new ApiError(apiError);
      });
}

export default new AxiosService();

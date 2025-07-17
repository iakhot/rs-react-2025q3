import axios from 'axios';

const apiUrl = 'https://api.kinopoisk.dev/v1.4';
const token = 'CZA38XR-FRA4EH3-KAPJRZ8-C3S9DZ8';

interface SearchParams {
  searchTerm: string;
  limit?: number;
  pageNumber?: number;
}

class AxiosService {
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
    );
}

export default new AxiosService();

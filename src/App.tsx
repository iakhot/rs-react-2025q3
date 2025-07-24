import './App.css';
import Search from './components/Search';
import { useCallback, useState } from 'react';
import AxiosService from './common/axiosService';
import SearchResult from './components/SearchResult';
import type { AxiosError } from 'axios';

export interface SearchResults {
  results: Movie[];
  isLoading: boolean;
  error: ApiError | null;
}

export interface ApiResult {
  docs: ApiMovie[];
}

export interface ApiMovie extends Movie {
  shortDescription?: string;
  alternativeName?: string;
}

export interface ApiError extends Error {
  status?: number;
  statusText?: string;
}

export interface Movie {
  id: number;
  name: string;
  description: string;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [results, setResults] = useState<Movie[]>([]);

  const convertData = (results: ApiMovie[]): Movie[] => {
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

  const loadData = useCallback((term: string) => {
    setIsLoading(true);
    setError(null);
    AxiosService.getMovies({ searchTerm: term })
      .then((res) => {
        const data = res?.data as ApiResult;
        console.log(data);
        const movies = convertData(data.docs);
        setResults(movies);
      })
      .catch((error: AxiosError) => {
        setError({
          message: error.message,
          name: error.name,
          status: error.response?.status,
          statusText: error.response?.statusText,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Search onSearch={loadData} />
      <SearchResult isLoading={isLoading} results={results} error={error} />
    </>
  );
}

export default App;

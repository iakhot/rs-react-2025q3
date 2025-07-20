import './App.css';
import ErrorButton from './components/ErrorButton';
import Search from './components/Search';
import React from 'react';
import AxiosService from './common/axiosService';
import SearchResult from './components/SearchResult';
import type { AxiosError } from 'axios';

export interface SearchResults {
  results: Movie[];
  isLoading: boolean;
  error: ApiError | null;
}

interface ApiResult {
  docs: object[];
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

class App extends React.Component<object, SearchResults> {
  constructor(props: object) {
    super(props);
    this.state = {
      results: [],
      isLoading: false,
      error: null,
    };
    this.loadData = this.loadData.bind(this);
  }

  componentWillUnmount(): void {
    this.setState({ results: [] });
  }

  convertData(results: object[]): Movie[] {
    return results.map((movie: object) => {
      return {
        id: movie.id,
        name: movie.name ? movie.name : movie.alternativeName,
        description: movie.description
          ? movie.description
          : movie.shortDescription,
      } as Movie;
    });
  }

  loadData(term: string) {
    this.setState({ isLoading: true });
    AxiosService.getMovies({ searchTerm: term })
      .then((res) => {
        const data = res?.data as ApiResult;
        console.log(data);
        const movies = this.convertData(data.docs);
        this.setState({ results: movies });
      })
      .catch((error: AxiosError) => {
        this.setState({
          error: {
            ...error,
            status: error.response?.status,
            statusText: error.response?.statusText,
          },
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  render() {
    return (
      <>
        <Search onSearch={this.loadData} />
        <SearchResult
          isLoading={this.state.isLoading}
          results={this.state.results}
          error={this.state.error}
        />
        <div className="card">
          <ErrorButton />
        </div>
      </>
    );
  }
}

export default App;

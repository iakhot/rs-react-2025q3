import './App.css';
import ErrorButton from './components/ErrorButton';
import Search from './components/Search';
import { loadFromStorage, saveToStorage } from './common/storageUtils';
import React from 'react';
import AxiosService from './common/axiosService';
import SearchResult from './components/SearchResult';

interface AppState extends SearchResults {
  term: string;
}

export interface SearchResults {
  results: Movie[];
  isLoading: boolean;
  error: Error | null;
}

interface apiResult {
  docs: object[];
}

export interface Movie {
  id: number;
  name: string;
  description: string;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const saved = loadFromStorage();
    this.state = {
      term: saved !== undefined ? saved : '',
      results: [],
      isLoading: false,
      error: null,
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount(): void {
    this.loadData(this.state.term);
  }

  componentWillUnmount(): void {
    this.setState({ results: [] });
  }

  convertData(results: object[]): Movie[] {
    return results.map((movie: object) => {
      return {
        id: movie.id,
        name: movie.name ?? movie.alternativeName,
        description: movie.description ?? movie.shortDescription,
      } as Movie;
    });
  }

  loadData(term: string) {
    this.setState({ isLoading: true });
    AxiosService.getMovies({ searchTerm: term })
      .then((res) => {
        const data = res?.data as apiResult;
        console.log(data);
        const movies = this.convertData(data.docs);
        this.setState({ results: movies });
      })
      .catch((error: Error) => {
        this.setState({ error: error });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  handleSearchClick(value: string | undefined) {
    if (value !== undefined) {
      const term = value.trim();
      saveToStorage(term);
      this.loadData(term);
    }
  }

  render() {
    return (
      <>
        <Search value={this.state.term} onSearch={this.handleSearchClick} />
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

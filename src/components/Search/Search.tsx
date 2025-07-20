import React from 'react';
import './index.css';
import { loadFromStorage, saveToStorage } from '../../common/storageUtils';

interface SearchProps {
  onSearch: (val: string) => void;
}

interface SearchState {
  term: string;
}

class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    const saved = loadFromStorage();
    this.state = {
      term: saved !== undefined ? saved : '',
    };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount(): void {
    this.props.onSearch(this.state.term);
  }

  handleSearchClick(value: string | undefined) {
    if (value !== undefined) {
      const term = value.trim();
      saveToStorage(term);
      this.props.onSearch(term);
    }
  }

  render() {
    return (
      <div className="card center">
        <input
          id="searchTerm"
          className="search-input"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
          onBlur={(e) => this.setState({ term: e.target.value.trim() })}
        />
        <button
          id="searchButton"
          onClick={() => this.handleSearchClick(this.state.term)}
          aria-label="Search button"
          title="Search"
        >
          {'Search'}
        </button>
      </div>
    );
  }
}

export default Search;

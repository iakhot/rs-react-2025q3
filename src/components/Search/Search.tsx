import React from 'react';
import './index.css';

interface SearchProps {
  value: string | undefined;
  onSearch: (val: string | undefined) => void;
}

class Search extends React.Component<
  SearchProps,
  { term: string | undefined }
> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      term: this.props.value,
    };
  }

  render() {
    return (
      <div className="card center">
        <input
          id="searchTerm"
          className="search-input"
          value={this.state.term}
          onChange={(e) => this.setState({ term: e.target.value })}
        />
        <button
          id="searchButton"
          onClick={() => this.props.onSearch(this.state.term)}
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

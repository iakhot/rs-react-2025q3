import './App.css';
import ErrorButton from './components/ErrorButton';
import Search from './components/Search/Search';
import { loadFromStorage, saveToStorage } from './common/storageUtils';
import React from 'react';

interface AppState {
  term: string;
}

class App extends React.Component<object, AppState> {
  constructor(props: object) {
    super(props);
    const saved = loadFromStorage();
    this.state = { term: saved !== undefined ? saved : '' };
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchClick(value: string | undefined) {
    if (value !== undefined) {
      saveToStorage(value.trim());
    }
  }
  render() {
    return (
      <>
        <Search value={this.state.term} onSearch={this.handleSearchClick} />
        <div className="card">
          <ErrorButton />
        </div>
      </>
    );
  }
}

export default App;

import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Search from './components/Search';
import { Outlet } from 'react-router';
import ThemeContextProvider from './context/ThemeContext';

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <Search />
        <Outlet />
      </ThemeContextProvider>
      <div style={{ margin: '0 auto', textAlign: 'center' }}>
        Icons by{' '}
        <a target="_blank" rel="noreferrer" href="https://icons8.com">
          Icons8
        </a>
      </div>
    </ErrorBoundary>
  );
}

export default App;

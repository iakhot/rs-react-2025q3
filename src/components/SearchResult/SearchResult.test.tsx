import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { moviesList } from '../../__tests__/mocks';
import SearchResult from './SearchResult';

describe('SearchResult', () => {
  it('renders results if successful', () => {
    render(
      <SearchResult isLoading={false} results={moviesList} error={null} />
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    const length = moviesList.length;
    const names = screen.getAllByTestId('card-name');
    const descriptions = screen.getAllByTestId('card-description');
    expect(names).toHaveLength(length);
    expect(descriptions).toHaveLength(length);
  });
  it('displays loader while fetching', () => {
    render(<SearchResult isLoading={true} results={[]} error={null} />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
  it('displays warning on error', () => {
    const error = new Error('Failed to load results');
    render(<SearchResult isLoading={false} results={[]} error={error} />);
    const errorMsg = screen.getByTestId('api-error');
    expect(errorMsg).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
    expect(errorMsg.textContent).toContain(
      `An error has occurred while loading the data:${error.message}`
    );
  });
  it('displays warning on 500 error', () => {
    const error = {
      status: 500,
      statusText: 'Internal Server error',
      name: '',
      message: '',
    };
    render(<SearchResult isLoading={false} results={[]} error={error} />);
    const errorMsg = screen.getByTestId('api-error');
    expect(errorMsg).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
    expect(errorMsg.textContent).toContain(
      `An error has occurred while loading the data:Server side error: ${error.status} ${error.statusText}`
    );
  });
  it('displays warning on 400 error', () => {
    const error = {
      status: 404,
      statusText: 'Not found',
      name: '',
      message: '',
    };
    render(<SearchResult isLoading={false} results={[]} error={error} />);
    const errorMsg = screen.getByTestId('api-error');
    expect(errorMsg).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
    expect(errorMsg.textContent).toContain(
      `An error has occurred while loading the data:Client side error: ${error.status} ${error.statusText}`
    );
  });
});

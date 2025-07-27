import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { moviesList } from '../../__tests__/mocks';
import CardList from './CardList';

describe('CardList', () => {
  it('renders correctly with data', () => {
    render(<CardList movies={moviesList} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    const length = moviesList.length;
    const names = screen.getAllByTestId('card-name');
    const descriptions = screen.getAllByTestId('card-description');
    expect(names).toHaveLength(length);
    expect(descriptions).toHaveLength(length);

    for (let i = 0; i < length; i++) {
      expect(names[i]).toHaveTextContent(moviesList[i].name);
      expect(moviesList[i].description).toContain(descriptions[i].textContent);
    }
  });
  it('renders correctly without data', () => {
    render(<CardList movies={[]} />);
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-name')).toBeNull();
    expect(screen.queryByTestId('card-description')).toBeNull();
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Nothing found, try another search term...'
    );
  });
});

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Card from './Card';
import { movieStub } from '../../__tests__/mocks';
import type { Movie } from '../../App';

describe('Card', () => {
  it('renders correctly with data', () => {
    render(<Card movie={movieStub} />);
    expect(screen.getByTestId('card-description')).toHaveTextContent(
      movieStub.description
    );
    expect(screen.getByTestId('card-name')).toHaveTextContent(movieStub.name);
  });
  it('renders correctly with empty data', () => {
    const movieStub: Movie = {
      id: 123,
      name: '',
      description: '',
    };
    render(<Card movie={movieStub} />);
    expect(screen.getByTestId('card-description')).toHaveTextContent('...');
    expect(screen.getByTestId('card-name')).toHaveTextContent('...');
  });
});

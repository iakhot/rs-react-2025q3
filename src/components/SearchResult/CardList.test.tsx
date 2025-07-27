import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { moviesMock } from '../../__tests__/mocks';
import CardList from './CardList';
import { createRouteStub } from '../../__tests__/setupTests';

describe('CardList', () => {
  it('renders correctly with data', () => {
    const RouteStub = createRouteStub(
      '/search',
      <CardList items={moviesMock} />
    );
    render(<RouteStub initialEntries={['/search']} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    const length = moviesMock.docs.length;
    const names = screen.getAllByTestId('card-name');
    const descriptions = screen.getAllByTestId('card-description');
    expect(names).toHaveLength(length);
    expect(descriptions).toHaveLength(length);

    for (let i = 0; i < length; i++) {
      expect(names[i]).toHaveTextContent(moviesMock.docs[i].name);
      expect(moviesMock.docs[i].description).toContain(
        descriptions[i].textContent
      );
    }
  });
  it('renders correctly without data', () => {
    const emptyList = moviesMock;
    emptyList.docs = [];
    const RouteStub = createRouteStub(
      '/search',
      <CardList items={moviesMock} />
    );
    render(<RouteStub initialEntries={['/search']} />);
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Description')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-name')).toBeNull();
    expect(screen.queryByTestId('card-description')).toBeNull();
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Nothing found, try another search term...'
    );
  });
});

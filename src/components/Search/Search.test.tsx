import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Search from './Search';
import { setup } from '../../__tests__/setupTests';
import { MemoryRouter } from 'react-router';

const testVal = 'Avatar';
const storageKey = 'searchTerm';

afterEach(() => {
  localStorage.clear();
});

describe('Search', () => {
  it('renders correctly with term', () => {
    localStorage.setItem(storageKey, testVal);
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Search');
    expect(screen.getByRole('textbox')).toHaveValue(testVal);
  });
  it('renders correctly with empty term', () => {
    render(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    expect(screen.getByRole('button')).toHaveTextContent('Search');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});

describe('Search interaction', () => {
  it('updates input value on change', async () => {
    const { ui } = setup(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await ui.type(input, testVal);
    expect(input).toHaveValue(testVal);
  });
  it('saves value on click', async () => {
    const { ui } = setup(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    expect(localStorage.getItem(storageKey)).toBe(null);
    await ui.type(input, testVal);
    await ui.click(screen.getByTestId('search-button'));
    expect(localStorage.getItem(storageKey)).toBe(testVal);
  });
  it('trims value', async () => {
    const { ui } = setup(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await ui.type(input, '   ' + testVal + '  ');
    await ui.click(screen.getByTestId('search-button'));
    expect(input).toHaveValue(testVal);
    expect(localStorage.getItem(storageKey)).toBe(testVal);
  });
  it('triggers callback on Search click', async () => {
    localStorage.setItem(storageKey, testVal);
    const { ui } = setup(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const button = screen.getByTestId('search-button');
    await ui.click(button);
    //expect(mockCallback).toHaveBeenCalledWith(testVal);
  });
});

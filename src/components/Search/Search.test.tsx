import { screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';
import { renderWithProviders } from '../../__tests__/setupTests';
import { MemoryRouter } from 'react-router';
import { LS_KEYS } from '../../common/types';

const testVal = 'Avatar';
const storageKey = LS_KEYS.term;
const mockNavigate = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

afterEach(() => {
  localStorage.clear();
});

describe('Search', () => {
  it('renders correctly with term', async () => {
    globalThis.localStorage.setItem(storageKey, testVal);
    renderWithProviders(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>,
      { preloadedState: { search: { value: testVal } } }
    );
    await waitFor(() => {
      expect(screen.getByRole('button')).toHaveTextContent('Search');
      expect(screen.getByTestId('search-input')).toHaveValue(testVal);
    });
  });
  it('renders correctly with empty term', () => {
    renderWithProviders(
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
    const { user } = renderWithProviders(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await user.type(input, testVal);
    expect(input).toHaveValue(testVal);
  });
  it('saves value on click', async () => {
    const { user } = renderWithProviders(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    expect(localStorage.getItem(storageKey)).toBe('');
    await user.type(input, testVal);
    await user.click(screen.getByTestId('search-button'));
    expect(localStorage.getItem(storageKey)).toBe(testVal);
  });
  it('trims value', async () => {
    const { user } = renderWithProviders(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>
    );
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await user.type(input, '   ' + testVal + '  ');
    await user.click(screen.getByTestId('search-button'));
    expect(input).toHaveValue(testVal);
    expect(localStorage.getItem(storageKey)).toBe(testVal);
  });
  it('triggers callback on Search click', async () => {
    const { user } = renderWithProviders(
      <MemoryRouter initialEntries={['/movies']}>
        <Search />
      </MemoryRouter>,
      { preloadedState: { search: { value: testVal } } }
    );
    const button = screen.getByTestId('search-button');
    expect(button).toBeInTheDocument();
    expect(screen.getByTestId('search-input')).toHaveValue(testVal);
    await user.click(button);
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        expect.stringContaining(`search?query=${testVal}`)
      );
    });
  });
});

import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';
import { setup } from '../../__tests__/setupTests';
import { loadFromStorage, saveToStorage } from '../../common/storageUtils';

const testVal = 'Avatar';
afterEach(() => {
  localStorage.clear();
});

describe('Search', () => {
  it('renders correctly with term', () => {
    saveToStorage(testVal);
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('Search');
    expect(screen.getByRole('textbox')).toHaveValue(testVal);
  });
  it('renders correctly with empty term', () => {
    render(<Search onSearch={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('Search');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});

describe('Search interaction', () => {
  it('updates input value on change', async () => {
    const { ui } = setup(<Search onSearch={vi.fn()} />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await ui.type(input, testVal);
    expect(input).toHaveValue(testVal);
  });
  it('saves value on click', async () => {
    const { ui } = setup(<Search onSearch={vi.fn()} />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    expect(loadFromStorage()).toBe(undefined);
    await ui.type(input, testVal);
    await ui.click(screen.getByTestId('search-button'));
    expect(loadFromStorage()).toBe(testVal);
  });
  it('trims value', async () => {
    const { ui } = setup(<Search onSearch={vi.fn()} />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await ui.type(input, '   ' + testVal + '  ');
    await ui.click(screen.getByTestId('search-button'));
    expect(input).toHaveValue(testVal);
    expect(loadFromStorage()).toBe(testVal);
  });
  it('triggers callback on Search click', async () => {
    const mockCallback = vi.fn();
    saveToStorage(testVal);
    const { ui } = setup(<Search onSearch={mockCallback} />);
    const button = screen.getByTestId('search-button');
    await ui.click(button);
    expect(mockCallback).toHaveBeenCalledWith(testVal);
  });
});

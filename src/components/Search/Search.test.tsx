import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Search from './Search';
import { setup } from '../../__tests__/setupTests';

const testVal = 'Avatar';
describe('Search', () => {
  it('renders correctly with term', () => {
    render(<Search value={testVal} onSearch={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('Search');
    expect(screen.getByRole('textbox')).toHaveValue(testVal);
  });
  it('renders correctly without term', () => {
    render(<Search value={undefined} onSearch={vi.fn()} />);
    expect(screen.getByRole('button')).toHaveTextContent('Search');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
describe('Search interaction', () => {
  it('updates input value on change', async () => {
    const { ui } = setup(<Search value="" onSearch={vi.fn()} />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    await ui.type(input, testVal);
    expect(input).toHaveValue(testVal);
  });
  it('triggers callback on Search click', async () => {
    const mockCallback = vi.fn();
    const { ui } = setup(<Search value={testVal} onSearch={mockCallback} />);
    const button = screen.getByTestId('search-button');
    await ui.click(button);
    expect(mockCallback).toHaveBeenCalledWith(testVal);
  });
});

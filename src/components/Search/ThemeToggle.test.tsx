import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import ThemeToggle from './ThemeToggle';
import { setup } from '../../__tests__/setupTests';
import ThemeContextProvider from '../../context/ThemeContext';

const themeKey = 'theme';

beforeEach(() => {
  localStorage.clear();
});

describe('ThemeToggle', () => {
  it('renders correctly', () => {
    render(<ThemeToggle />);
    expect(screen.getByText(/Light/i)).toBeInTheDocument();
    expect(screen.getByText(/Dark/i)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
  it('renders theme from LS', async () => {
    localStorage.setItem(themeKey, 'dark');
    const { ui } = setup(
      <ThemeContextProvider>
        <ThemeToggle />
      </ThemeContextProvider>
    );
    const toggle = screen.getByRole('checkbox');
    expect(toggle).toBeChecked();
    await ui.click(toggle);
    waitFor(() => {
      expect(localStorage.getItem(themeKey)).toBe(/Dark/i);
    });
  });
  it('toggles theme in LS', async () => {
    localStorage.setItem(themeKey, 'light');
    const { ui } = setup(
      <ThemeContextProvider>
        <ThemeToggle />
      </ThemeContextProvider>
    );
    const toggle = screen.getByRole('checkbox');
    expect(toggle).not.toBeChecked();
    await ui.click(toggle);
    waitFor(() => {
      expect(localStorage.getItem(themeKey)).toEqual('dark');
    });
  });
});

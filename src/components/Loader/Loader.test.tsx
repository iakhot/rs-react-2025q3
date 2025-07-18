import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Loader from './Loader';

describe('Loader', () => {
  it('renders correctly', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('react.svg');
    expect(img).toHaveAttribute('aria-label', 'Loading results');
  });
});

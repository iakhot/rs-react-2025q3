import { render, screen } from '@testing-library/react';
import { NotFound } from './NotFound';
import { describe, expect, it } from 'vitest';

describe('Nor found page', () => {
  it('renders correctly', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
    const warning = screen.getByText("We couldn't find this page.");
    expect(warning).toBeInTheDocument();
    expect(warning).toHaveAttribute(
      'class',
      expect.stringContaining('warning')
    );
  });
});

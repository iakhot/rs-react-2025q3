import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorButton, { UnexpectedError } from './ErrorButton';
import { setup } from '../../__tests__/setupTests';

describe('ErrorButton', () => {
  it('renders a button', () => {
    render(<ErrorButton />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Throw error');
  });
  it('throws an error on click', () => {
    const { ui } = setup(<ErrorButton />);
    const promise = ui.click(screen.getByRole('button'));
    expect(promise).rejects.toThrowError(UnexpectedError);
  });
});

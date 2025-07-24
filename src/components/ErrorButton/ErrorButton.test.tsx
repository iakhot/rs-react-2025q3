import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorButton, { UnexpectedError } from './ErrorButton';
import { setup } from '../../__tests__/setupTests';
import ErrorBoundary from '../ErrorBoundary';

describe('ErrorButton', () => {
  it('renders a button', () => {
    render(<ErrorButton />);
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Throw error');
  });
  it('throws an error on click', async () => {
    const { ui } = setup(<ErrorButton />);
    const promise = ui.click(screen.getByRole('button'));
    await expect(promise).rejects.toThrowError(UnexpectedError);
  });
  it('triggers error boundary fallback UI', async () => {
    const { ui } = setup(
      <ErrorBoundary>
        <ErrorButton />
      </ErrorBoundary>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Throw error');
    await ui.click(screen.getByRole('button'));
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Something went wrong...'
    );
    expect(screen.getByRole('button')).toHaveTextContent('Try again');
  });
});

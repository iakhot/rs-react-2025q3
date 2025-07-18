import { screen, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorBoundary from '../ErrorBoundary';
import { DUMMY_ERROR, ErrorDummy } from '../../__tests__/mocks';

describe('ErrorBoundary', () => {
  it('catches errors in child components', async () => {
    const spyDidCatch = vi.spyOn(ErrorBoundary.prototype, 'componentDidCatch');
    render(
      <ErrorBoundary>
        <ErrorDummy shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(spyDidCatch).lastCalledWith(
      new Error(DUMMY_ERROR),
      expect.objectContaining({ componentStack: expect.any(String) })
    );
  });
  it('displays fallback UI', () => {
    render(
      <ErrorBoundary>
        <ErrorDummy shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(screen.getByRole('paragraph')).toHaveTextContent(
      'Something went wrong...'
    );
    expect(screen.getByRole('button')).toHaveTextContent('Try again');
  });
  it('logs error to console', () => {
    const spyConsoleLog = vi.spyOn(console, 'log');
    render(
      <ErrorBoundary>
        <ErrorDummy shouldThrow={true} />
      </ErrorBoundary>
    );
    expect(spyConsoleLog).toHaveBeenCalledWith(
      expect.stringContaining(`An error has been caught: ${DUMMY_ERROR}`)
    );
  });
});

import { describe, expect, it, beforeEach } from 'vitest';

describe('Root renders correctly', () => {
  beforeEach(() => {
    const container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  });

  it('does not throw', async () => {
    await import('./main');

    const rootElement = document.getElementById('root');
    expect(rootElement).toBeInTheDocument();
  });
});

import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactNode } from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

export function setup(jsx: ReactNode) {
  return {
    ui: userEvent.setup(),
    ...render(jsx),
  };
}

export function renderAsync(jsx: ReactNode) {
  return act(async () => render(jsx));
}

afterEach(() => {
  cleanup(); // unmounts React trees
});

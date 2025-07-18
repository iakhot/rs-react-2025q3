import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
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

afterEach(() => {
  cleanup(); // unmounts React trees
});

import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSX, ReactNode } from 'react';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
import { createMemoryRouter, createRoutesStub } from 'react-router';
import React, { type PropsWithChildren } from 'react';
import { ErrorMessage } from '../components/common';
import type { ApiResult, ApiMovieDetails } from '../App';

import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../common/store';
import type { AppStore, RootState } from '../common/store';

export function setup(jsx: ReactNode) {
  return {
    ui: userEvent.setup(),
    ...render(jsx),
  };
}

export function renderAsync(jsx: ReactNode | React.ReactElement) {
  return act(async () => render(jsx));
}

afterEach(() => {
  cleanup(); // unmounts React trees
});

export function createRouteStub(path: string, component: React.JSX.Element) {
  return createRoutesStub([
    {
      path: path,
      Component: () => component,
    },
  ]);
}

export function mockMemoryRouter(
  path: string,
  component: React.JSX.Element,
  loaderMock: () => Promise<ApiResult> | Promise<ApiMovieDetails>
) {
  return createMemoryRouter(
    [
      {
        path: path,
        Component: () => component,
        loader: () => loaderMock(),
        errorElement: <ErrorMessage className="card min-vh70" />,
      },
    ],
    {
      initialEntries: [path],
    }
  );
}

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }
  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

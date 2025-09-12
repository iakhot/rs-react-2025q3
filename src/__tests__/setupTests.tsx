import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { JSX, ReactNode } from 'react';
import { cleanup } from '@testing-library/react';
import { afterAll, afterEach, beforeAll } from 'vitest';
import { createMemoryRouter, createRoutesStub } from 'react-router';
import React, { type PropsWithChildren } from 'react';

import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { setupStore } from '../common/store';
import type { AppStore, RootState } from '../common/store';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';
import { apiUrl } from '../common/moviesApi';
import { detailsApiMock, moviesMock } from './mocks';

export function setup(jsx: ReactNode) {
  return {
    ui: userEvent.setup(),
    ...render(jsx),
  };
}

export function renderAsync(jsx: ReactNode | React.ReactElement) {
  return act(async () => render(jsx));
}

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

export function createRouteStub(path: string, component: React.JSX.Element) {
  return createRoutesStub([
    {
      path: path,
      Component: () => component,
    },
  ]);
}

export function mockMemoryRouter(path: string, component: React.JSX.Element) {
  return createMemoryRouter(
    [
      {
        path: path,
        Component: () => component,
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

const handlers = [
  http.get(`${apiUrl}/search`, () => {
    return HttpResponse.json(moviesMock);
  }),
  http.get(`${apiUrl}/:id`, ({ params }) => {
    const { id } = params;
    if (id === '123') {
      return HttpResponse.json({ message: 'Not found' }, { status: 404 });
    }
    return HttpResponse.json(detailsApiMock);
  }),
];
export const server = setupServer(...handlers);

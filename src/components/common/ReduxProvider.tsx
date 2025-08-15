'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { setupStore } from 'common/store'; // Your Redux store
import { useLocalStorage } from 'common/hooks';
import { LS_KEYS } from 'common/types';

function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [term] = useLocalStorage(LS_KEYS.term);
  const store = setupStore({ search: { value: term } });

  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;

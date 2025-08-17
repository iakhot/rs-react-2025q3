'use client';

import React, { useRef } from 'react';
import { Provider } from 'react-redux';
import { setupStore, type AppStore } from '@/common/store'; // Your Redux store
import { useLocalStorage } from '@/common/hooks';
import { LS_KEYS } from '@/common/types';

function ReduxProvider({ children }: { children: React.ReactNode }) {
  const [term] = useLocalStorage(LS_KEYS.term);
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = setupStore({ search: { value: term } });
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

export default ReduxProvider;

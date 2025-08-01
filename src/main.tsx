import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { router } from './router.tsx';
import { Provider } from 'react-redux';
import { store } from './common/store.ts';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);

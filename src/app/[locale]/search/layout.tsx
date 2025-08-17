import { Suspense, type ReactNode } from 'react';
import '@/App.css';
import '@/index.css';
import ReduxProvider from '@/components/common/ReduxProvider';
import Search from '@/components/Search';
import Loader from '@/components/Loader';

export default function SearchLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ReduxProvider>
        <Search />
        <Suspense fallback={<Loader className="container center min-vh70" />}>
          {children}
        </Suspense>
      </ReduxProvider>
    </>
  );
}

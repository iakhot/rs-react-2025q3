'use client';

import Search from 'components/Search';
import SearchResult from 'components/SearchResult';
import dynamic from 'next/dynamic';

const ReduxProvider = dynamic(() => import('components/common/ReduxProvider'), {
  ssr: false,
});

export default function SearchPage() {
  return (
    <ReduxProvider>
      <Search />
      <SearchResult />
    </ReduxProvider>
  );
}

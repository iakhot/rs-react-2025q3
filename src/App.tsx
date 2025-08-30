import { lazy, startTransition, Suspense } from 'react';
import './App.css';
import fetchData from './common/serverAction';
import ListSkeleton from './components/ListSkeleton';
import type { EmissionsData } from './common/types';

import { selectByYear, setData } from './common/tableSlice';
import { useAppDispatch, useAppSelector } from './common/hooks';

const DataList = lazy(() => import('./components/DataList'));

function App() {
  const data = useAppSelector(selectByYear) as EmissionsData;
  const dispatch = useAppDispatch();

  const handleDownload = () => {
    startTransition(async () => {
      const data = await fetchData();
      dispatch(setData(data as EmissionsData));
    });
  };

  return (
    <main className="flex flex-col w-full max-w-3/4">
      <div className="card">
        <button id="download-button" onClick={handleDownload}>
          Download Data
        </button>
      </div>
      <h1>CO2 Emissions by Our World in Data</h1>

      <Suspense fallback={<ListSkeleton />}>
        {data && (
          <div className="card">
            <DataList items={data} />
          </div>
        )}
      </Suspense>
    </main>
  );
}

export default App;

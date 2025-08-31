import { lazy, startTransition, Suspense, useMemo } from 'react';
import './App.css';
import fetchData from './common/serverAction';
import ListSkeleton from './components/ListSkeleton';
import type { CountryData } from './common/types';

import { selectFilteredData, setData } from './common/tableSlice';
import { useAppDispatch, useAppSelector } from './common/hooks';

const DataList = lazy(() => import('./components/DataList'));

function App() {
  const filteredSelector = useMemo(() => selectFilteredData, []);
  const data = useAppSelector((state) =>
    filteredSelector(state)
  ) as CountryData[];

  const dispatch = useAppDispatch();

  const handleDownload = () => {
    startTransition(async () => {
      const data = await fetchData();

      dispatch(setData(data as Array<CountryData>));
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

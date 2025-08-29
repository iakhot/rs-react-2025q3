import { lazy, startTransition, Suspense } from 'react';
import './App.css';
import fetchData from './common/serverAction';
//import { useGetDataQuery } from './common/dataApi';
import ListSkeleton from './components/ListSkeleton';
import type { EmissionsData } from './common/types';

import { selectTableData, setData } from './common/tableSlice';
import { useAppDispatch, useAppSelector } from './common/hooks';

const DataList = lazy(() => import('./components/DataList'));

function App() {
  //const { data, error, isLoading } = useGetDataQuery();
  //const [data, setData] = useState<EmissionsData | null>(null);
  const data = useAppSelector(selectTableData);
  const dispatch = useAppDispatch();
  console.log(`=== App ${Object.keys(data)}`);

  const handleDownload = () => {
    startTransition(async () => {
      const data = await fetchData();
      console.log(`==== dwnl ${Object.keys(data as EmissionsData)}`);
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

import { lazy, memo, Suspense, useState } from 'react';
import type { CountryData } from '../common/types';
import ListSkeleton from './ListSkeleton';

const CountryDetails = lazy(() => import('./CountryDetails'));

const TableRow = memo(function TableRow({
  item,
  name,
}: {
  item: CountryData;
  name: string;
}) {
  const [open, setIsOpen] = useState(false);
  const iso = item.iso_code ?? 'N/A';
  const pop = item.data?.at(-1)?.population ?? 'N/A';
  return (
    <>
      <tr className="cursor-pointer bg-gray-200 text-gray-800">
        <td
          key={`${name}-arrow`}
          className="py-9 px-2 text-base font-normal flex items-center justify-center h-full"
        >
          <svg
            className={`text-black w-6 h-6 z-40  ${
              open ? 'rotate-180' : 'rotate-0'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={() => setIsOpen(!open)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </td>
        <td key={`${name}-name`} className="p-4 items-center justify-center ">
          {name}
        </td>
        <td key={`${name}-pop`} className="p-4 items-center justify-center ">
          {pop}
        </td>
        <td key={`${name}-iso`} className="p-4 items-center justify-center">
          {iso}
        </td>
        <td></td>
      </tr>
      <tr
        className={`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${
          open ? 'max-h-20' : 'max-h-0'
        }`}
      >
        <td colSpan={8}>
          <Suspense fallback={<ListSkeleton />}>
            <CountryDetails years={item.data} open={open} />
          </Suspense>
        </td>
      </tr>
    </>
  );
});

export default TableRow;

import { Fragment, lazy, Suspense, useState } from 'react';
import type { EmissionsData } from '../common/types';
const CountryDetails = lazy(() => import('./CountryDetails'));

function DataList({ items }: { items: EmissionsData }) {
  if (!items) return <p>No Data</p>;
  return (
    <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border-separate border-spacing-y-1 border-spacing-x-0 bg-gray-500 rounded">
      <thead className="">
        <tr className="text-base text-white font-semibold ">
          <td className="p-4 items-center justify-center rounded-l-lg"></td>
          <td className="p-4 items-center justify-center">Country</td>
          <td className="p-4 items-center justify-center">Population</td>
          <td className="p-4 items-center justify-center rounded-r-lg">ISO</td>
        </tr>
      </thead>
      <tbody>
        {Object.keys(items).map((key) => {
          const [open, setIsOpen] = useState(false);
          const iso = items[key].iso_code ?? 'N/A';
          const pop = items[key].data.at(-1)?.population ?? 'N/A';
          return (
            <Fragment key={key}>
              <tr className="cursor-pointer bg-gray-200 text-gray-800">
                <td
                  key={`${key}-arrow`}
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
                <td
                  key={`${key}-name`}
                  className="p-4 items-center justify-center "
                >
                  {key}
                </td>
                <td
                  key={`${key}-pop`}
                  className="p-4 items-center justify-center "
                >
                  {pop}
                </td>
                <td
                  key={`${key}-iso`}
                  className="p-4 items-center justify-center"
                >
                  {iso}
                </td>
              </tr>
              <tr
                className={`w-full overflow-hidden transition-[max-height] delay-1000 duration-1000 ease-in-out  ${
                  open ? 'max-h-20' : 'max-h-0'
                }`}
              >
                <td colSpan={8}>
                  <Suspense fallback={<p>Loading ...</p>}>
                    <CountryDetails years={items[key].data} open={open} />
                  </Suspense>
                </td>
              </tr>
            </Fragment>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataList;

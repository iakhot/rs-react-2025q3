import { usePathname, useSearchParams } from 'next/navigation';
import { useTheme } from '../../common/hooks';
import Link from 'next/link';

function Pagination({
  pages = 10,
  current,
}: {
  pages: number;
  current: number;
}) {
  const { currentTheme } = useTheme();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const range = (start: number, stop: number, step: number): number[] =>
    Array.from(
      { length: Math.ceil((stop - start) / step) },
      (_, i) => start + i * step
    );

  const arr = range(1, pages + 1, 1);

  const getPageURL = (page: number) => {
    const newQuery = new URLSearchParams(searchParams);
    newQuery.set('page', String(page));
    newQuery.delete('details');
    return `${pathname}?${newQuery.toString()}`;
  };

  return (
    <nav>
      <ul className="paging">
        {[...arr].map((i) => {
          return (
            <li key={i} className="page">
              {i == current ? (
                <button className="button selected">
                  <Link href={getPageURL(i)}>{i}</Link>
                </button>
              ) : (
                <button className={currentTheme}>
                  <Link href={getPageURL(i)}>{i}</Link>
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Pagination;

import { useSearchParams } from 'next/navigation';
import { useTheme } from '../../common/hooks';
import { useRouter } from 'next/navigation';

function Pagination({
  pages = 10,
  current,
}: {
  pages: number;
  current: number;
}) {
  const { currentTheme } = useTheme();
  const searchParams = useSearchParams();
  const router = useRouter();
  const range = (start: number, stop: number, step: number): number[] =>
    Array.from(
      { length: Math.ceil((stop - start) / step) },
      (_, i) => start + i * step
    );

  const arr = range(1, pages + 1, 1);

  const handleClick = (page: number) => {
    const newQuery = new URLSearchParams(searchParams);
    newQuery.set('page', String(page));
    newQuery.delete('details');
    router.push(`?${newQuery.toString()}`);
  };

  return (
    <nav>
      <ul className="paging">
        {[...arr].map((i) => {
          return (
            <li key={i} className="page">
              {i == current ? (
                <button
                  className="button selected"
                  onClick={() => handleClick(i)}
                >
                  {i}
                </button>
              ) : (
                <button className={currentTheme} onClick={() => handleClick(i)}>
                  {i}
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

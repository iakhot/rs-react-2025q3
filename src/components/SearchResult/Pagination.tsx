import { useSearchParams } from 'react-router';

function Pagination({
  pages = 10,
  current,
}: {
  pages: number;
  current: number;
}) {
  const [, setSearchParams] = useSearchParams();
  const range = (start: number, stop: number, step: number): number[] =>
    Array.from(
      { length: Math.ceil((stop - start) / step) },
      (_, i) => start + i * step
    );

  const arr = range(1, pages + 1, 1);

  const handleClick = (page: number) => {
    setSearchParams((params) => {
      params.set('page', String(page));
      params.delete('details');
      return params;
    });
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
                <button className="button" onClick={() => handleClick(i)}>
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

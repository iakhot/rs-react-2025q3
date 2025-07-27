import { NavLink, useSearchParams } from 'react-router';
import type { Movie } from '../../App';

function Card({ movie }: { movie: Movie }) {
  const [query] = useSearchParams();
  const newQuery = new URLSearchParams(query);
  newQuery.set('details', String(movie.id));

  const isActive = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('details') === String(movie.id);
  };

  return (
    <>
      <div data-testid="card-name" className="item descr text-center">
        <NavLink
          relative="path"
          to={{ search: newQuery.toString() }}
          className={({ isActive: defaultIsActive }) =>
            defaultIsActive && isActive() ? 'movie-link active' : 'movie-link'
          }
        >
          <span>{movie.name ? movie.name : '...'}</span>
        </NavLink>
      </div>
      <div data-testid="card-description" className="item descr">
        {movie.description ? movie.description : '...'}
      </div>
    </>
  );
}

export default Card;

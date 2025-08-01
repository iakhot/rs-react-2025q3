import { NavLink, useSearchParams } from 'react-router';
import { type Movie } from '../../App';
import { useAppDispatch } from '../../common/hooks';
import { selectMovie, unselectMovie } from './selectedSlice';
import React from 'react';

function Card({ movie, selected }: { movie: Movie; selected: boolean }) {
  const dispatch = useAppDispatch();
  const [query] = useSearchParams();
  const newQuery = new URLSearchParams(query);
  newQuery.set('details', String(movie.id));

  const isActive = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('details') === String(movie.id);
  };

  const handleSelect = (
    movie: Movie,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (dispatch) {
      if (checked) {
        dispatch(selectMovie(movie));
      } else {
        dispatch(unselectMovie(movie.id));
      }
    }
  };

  return (
    <>
      <div data-testid="card-selected">
        <input
          type="checkbox"
          checked={selected}
          title="movie-selected"
          onChange={(e) => handleSelect(movie, e)}
        />
      </div>
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

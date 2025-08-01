import { NavLink, useSearchParams } from 'react-router';
import { type Movie } from '../../App';
import { useAppDispatch } from '../../common/hooks';
import { selectMovie, deselectMovie } from './selectedSlice';
import React, { useState } from 'react';

function Card({ movie, selected }: { movie: Movie; selected: boolean }) {
  const dispatch = useAppDispatch();
  const [isSelected, setIsSelected] = useState(selected);
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
      setIsSelected(checked);
      console.log(`======= CARD ==== id ${movie.id} is sel ${checked}`);
      if (checked) {
        dispatch(selectMovie(movie));
      } else {
        dispatch(deselectMovie(movie.id));
      }
    }
  };

  return (
    <>
      <div data-testid="card-selected">
        <input
          type="checkbox"
          checked={isSelected}
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

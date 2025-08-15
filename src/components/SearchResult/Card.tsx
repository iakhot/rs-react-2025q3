import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { type Movie } from '../../common/types';
import { useAppDispatch, useTheme } from '../../common/hooks';
import { selectMovie, unselectMovie } from './selectedSlice';
import React from 'react';

function Card({ movie, selected }: { movie: Movie; selected: boolean }) {
  const { currentTheme } = useTheme();
  const dispatch = useAppDispatch();
  const query = useSearchParams();
  const newQuery = new URLSearchParams(query);
  newQuery.set('details', String(movie.id));

  const handleSelect = (
    movie: Movie,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;
    if (dispatch) {
      if (checked) {
        dispatch(selectMovie(movie.id));
      } else {
        dispatch(unselectMovie(movie.id));
      }
    }
  };

  return (
    <>
      <div data-testid="card-selected" className="item descr text-center">
        <input
          type="checkbox"
          checked={selected}
          title="movie-selected"
          className={`${currentTheme}`}
          onChange={(e) => handleSelect(movie, e)}
        />
      </div>
      <div data-testid="card-name" className="item descr text-center">
        <Link href={{ search: newQuery.toString() }} className="movie-link">
          <span>{movie.name ? movie.name : '...'}</span>
        </Link>
      </div>
      <div data-testid="card-description" className="item descr">
        {movie.description ? movie.description : '...'}
      </div>
    </>
  );
}

export default Card;

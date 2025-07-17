import type { Movie } from '../../App';

function Card({ movie }: { movie: Movie }) {
  return (
    <>
      <div className="item text-center"> {movie.name} </div>
      <div className="item descr">
        {' '}
        {movie.description ? movie.description : '...'}{' '}
      </div>
    </>
  );
}

export default Card;

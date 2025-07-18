import type { Movie } from '../../App';

function Card({ movie }: { movie: Movie }) {
  return (
    <>
      <div data-testid="card-name" className="item text-center">
        {movie.name ? movie.name : '...'}
      </div>
      <div data-testid="card-description" className="item descr">
        {movie.description ? movie.description : '...'}
      </div>
    </>
  );
}

export default Card;

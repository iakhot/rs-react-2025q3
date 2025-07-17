import type { Movie } from '../../App';
import Card from './Card';
import './index.css';

function CardList({ movies }: { movies: Movie[] }) {
  return (
    <>
      {movies.length > 0 ? (
        <div className="container">
          <div className="item fw600 text-center"> Name </div>
          <div className="item fw600 text-center"> Description </div>
          {movies.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <p className="text-center">Nothing found, try another search term...</p>
      )}
    </>
  );
}

export default CardList;

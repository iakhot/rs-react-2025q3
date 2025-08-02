import { memo } from 'react';
import type { ApiResult, Movie } from '../../App';
import Card from './Card';
import './index.css';
import Pagination from './Pagination';
import { useAppSelector } from '../../common/hooks';
import { selectedMovieIds } from './selectedSlice';
import { DownloadSelected } from '../common';

const CardList = memo(function CardList({ items }: { items: ApiResult }) {
  const { docs, pages, page } = items;
  const selectedIds = useAppSelector(selectedMovieIds);

  return (
    <>
      {docs?.length > 0 ? (
        <div className="flex-child-container min-vw50">
          <div className="card grid">
            <div className="item fw600 text-center"> {''} </div>
            <div className="item fw600 text-center"> Name </div>
            <div className="item fw600 text-center"> Description </div>
            {docs.map((movie: Movie) => {
              return (
                <Card
                  key={movie.id}
                  movie={movie}
                  selected={selectedIds.includes(movie.id)}
                />
              );
            })}
          </div>
          <div className="card flex-child-container flex-row">
            {selectedIds.length > 0 ? <DownloadSelected /> : null}
            {pages > 1 ? <Pagination pages={10} current={page} /> : null}
          </div>
        </div>
      ) : (
        <p className="text-center">Nothing found, try another search term...</p>
      )}
    </>
  );
});

export default CardList;

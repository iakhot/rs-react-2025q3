import { memo } from 'react';
import type { ApiResult, Movie } from '../../common/types';
import Card from './Card';
import './index.css';
import Pagination from './Pagination';
import { useAppSelector, useTheme } from '../../common/hooks';
import { selectedMovieIds } from './selectedSlice';
import { DownloadSelected } from '../common';
import { useGetMoviesQuery } from '../../common/moviesApi';
import { selectSearchTerm } from '../Search/searchSlice';
import Image from 'next/image';
import reloadIcon from '../../../public/icons8-reload.png';

const CardList = memo(function CardList({ items }: { items: ApiResult }) {
  const { docs, pages, page } = items;
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedIds = useAppSelector(selectedMovieIds);
  const { refetch } = useGetMoviesQuery({
    searchTerm: searchTerm,
    pageNumber: page,
  });
  const { currentTheme } = useTheme();

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
            <DownloadSelected hidden={selectedIds.length == 0} />
            {pages > 1 ? <Pagination pages={10} current={page} /> : null}
            <button
              title="Reload"
              className={`reload ${currentTheme}`}
              onClick={refetch}
            >
              <Image alt="Reload icon" src={reloadIcon} />
              Reload
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">Nothing found, try another search term...</p>
      )}
    </>
  );
});

export default CardList;

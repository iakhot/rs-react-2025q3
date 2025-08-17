'use client';
import { memo } from 'react';
import type { ApiResult, Movie } from '@/common/types';
import Card from './Card';
import './index.css';
import Pagination from './Pagination';
import { useAppSelector } from '@/common/hooks';
import { selectedMovies } from './selectedSlice';
import { DownloadSelected } from '@/components/common';
import { useGetMoviesQuery } from '@/common/moviesApi';
import { selectSearchTerm } from '@/components/Search/searchSlice';
import Image from 'next/image';
import reloadIcon from '../../../public/icons8-reload.png';
import { useTranslations } from 'next-intl';

const CardList = memo(function CardList({ items }: { items: ApiResult }) {
  const { docs, pages, page } = items;
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedIds = useAppSelector(selectedMovies);
  const { refetch } = useGetMoviesQuery({
    searchTerm: searchTerm,
    pageNumber: page,
  });
  const t = useTranslations('CardList');

  return (
    <>
      {docs?.length > 0 ? (
        <div className="flex-child-container min-vw50">
          <div className="card grid">
            <div className="item fw600 text-center"> {''} </div>
            <div className="item fw600 text-center"> {t('name')} </div>
            <div className="item fw600 text-center"> {t('description')} </div>
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
            <button title={t('reload')} className={`reload`} onClick={refetch}>
              <Image alt={t('reloadIconAlt')} src={reloadIcon} />
              {t('reload')}
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center">{t('emptyList')}</p>
      )}
    </>
  );
});

export default CardList;

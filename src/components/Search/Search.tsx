'use client';
import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
} from 'react';
import './index.css';
import {
  useAppDispatch,
  useAppSelector,
  useLocalStorage,
} from '../../common/hooks';
import { ThemeContext } from '../../context/ThemeContext';
import { unselectAll } from '../SearchResult/selectedSlice';
import { selectSearchTerm, setSearchTerm } from './searchSlice';
import { LS_KEYS } from '../../common/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const getQueryString = (value: string, page: string): URLSearchParams => {
  const newQuery = new URLSearchParams();
  newQuery.set('query', value);
  newQuery.set('page', page);
  return newQuery;
};

function Search() {
  const { currentTheme } = useContext(ThemeContext);
  const [, saveTerm] = useLocalStorage(LS_KEYS.term);
  const searchTerm = useAppSelector(selectSearchTerm);

  const [inputVal, setInputVal] = useState(searchTerm);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const t = useTranslations('Search');

  useEffect(() => {
    const page = params.get('page') || '1';
    const newQuery = getQueryString(searchTerm, page);
    router.push(`${pathname}?${newQuery.toString()}`);
  }, []);

  const handleSearchClick = (value: string): void => {
    if (value !== undefined) {
      const term = value !== '' ? value.trim() : '';
      saveTerm(term);
      dispatch(setSearchTerm(term));
      dispatch(unselectAll());
      const newQuery = getQueryString(term, '1');
      router.push(`?${newQuery.toString()}`);
    }
  };

  return (
    <div className="card center vw50">
      <input
        id="searchTerm"
        data-testid="search-input"
        className={`search-input input-${currentTheme}`}
        value={inputVal}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInputVal(e.currentTarget.value)
        }
        onBlur={(e: FocusEvent<HTMLInputElement>) =>
          setInputVal(e.currentTarget?.value.trim())
        }
      />
      <button
        id="searchButton"
        data-testid="search-button"
        onClick={() => handleSearchClick(inputVal)}
        aria-label={t('button')}
        title={t('button')}
        className={`search-button ${currentTheme}`}
      >
        {t('button')}
      </button>
    </div>
  );
}

export default Search;

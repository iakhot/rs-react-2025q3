import { use, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store';
import { ThemeContext } from '../context/ThemeContext';

type UseLocalStorageReturn = [string, (value: string) => void];

export function useLocalStorage(
  key: string,
  defaultValue = ''
): UseLocalStorageReturn {
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key);
    return saved ?? defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, value.trim());
  }, [value, key]);

  return [value, setValue];
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export function useTheme() {
  return use(ThemeContext);
}

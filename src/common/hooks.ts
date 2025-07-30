import { useEffect, useState } from 'react';

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

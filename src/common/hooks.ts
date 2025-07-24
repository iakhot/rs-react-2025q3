type UseLocalStorageReturn = [string, (value: string) => void];

export function useLocalStorage(
  key: string,
  defaultValue = ''
): UseLocalStorageReturn {
  const saved = localStorage.getItem(key);
  const value = saved ?? defaultValue;
  const setWrapper = (value: string) => {
    localStorage.setItem(key, value.trim());
  };
  return [value, setWrapper];
}

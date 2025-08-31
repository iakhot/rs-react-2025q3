import type { Sort } from './tableSlice';
import type { CountryData } from './types';

export const convertFloat = (number: number | undefined) => {
  if (!number) return;
  if (!Number.isInteger(number)) {
    return number.toFixed(3);
  }
  return number.toString();
};

export const transformData = (data: Record<string, CountryData>) => {
  const normalized: CountryData[] = [];
  Object.keys(data).forEach((key) => {
    const populationView = data[key].data?.at(-1)?.population;
    normalized.push({
      name: key,
      iso_code: data[key].iso_code,
      data: [...data[key].data],
      population: populationView,
    });
  });
  return normalized;
};

export const sortData = (data: CountryData[], sortParams: Sort) => {
  if (Object.keys(sortParams).length == 0) return data;

  return data.sort((a, b) => {
    const valueA = a[sortParams.column as keyof CountryData];
    const valueB = b[sortParams.column as keyof CountryData];

    if (valueA === undefined && b === undefined) return 0;
    if (valueA === undefined) return sortParams.order === 'asc' ? 1 : -1;
    if (valueB === undefined) return sortParams.order === 'asc' ? -1 : 1;

    if (valueA < valueB) {
      return sortParams.order === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortParams.order === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

'use server';

import { transformData } from './utils';

export const dataUrl =
  'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export default async function fetchData() {
  return fetch(dataUrl, { referrer: '' })
    .then(async (res) => {
      const data = await res.json();
      return new Promise((res) => res(transformData(data)));
    })
    .catch(console.log);
}

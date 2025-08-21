'use server';

import { data } from "./dataMock";

export const dataUrl = 'https://nyc3.digitaloceanspaces.com/owid-public/data/co2/owid-co2-data.json';

export default async function fetchData() {

    // return fetch(dataUrl,
    //     { referrer: "" }
    // )
    //     .then((res) => res.json())
    //     .catch(console.log);
    let tid = 0;
    return new Promise((res) => {
        tid = setTimeout(() => res(data), 3000);
    }).finally(() => {
        clearTimeout(tid);
    })
}
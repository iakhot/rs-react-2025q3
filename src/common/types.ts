export type EmissionsData = Record<string, CountryData>;
export interface CountryData {
    iso_code?: string;
    data: YearData[];
}
export interface YearData {
    year: number;
    population?: number;
    cement_co2?: number;
    cement_co2_per_capita?: number;
    co2?: number;
    co2_per_capita?: number;
    coal_co2?: number;
    coal_co2_per_capita?: number;
    energy_per_capita?: number;
    methane?: number;
    methane_per_capita?: number;
    nitrous_oxide?: number;
    nitrous_oxide_per_capita?: number;
    oil_co2?: number;
    oil_co2_per_capita?: number;
    temperature_change_from_co2?: number;
    temperature_change_from_ch4?: number;
    temperature_change_from_n2o?: number;
}
export interface CountryData {
  name: string;
  population?: number;
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

export const Columns = {
  year: 'Year',
  population: 'Population',
  cement_co2: 'Cement CO2',
  cement_co2_per_capita: 'cement_co2_per_capita',
  co2: 'CO2',
  co2_per_capita: 'co2_per_capita',
  coal_co2: 'coal_co2',
  coal_co2_per_capita: 'coal_co2_per_capita',
  energy_per_capita: 'energy_per_capita',
  methane: 'methane',
  methane_per_capita: 'methane_per_capita',
  nitrous_oxide: 'nitrous_oxide',
  nitrous_oxide_per_capita: 'nitrous_oxide_per_capita',
  oil_co2: 'oil_co2',
  oil_co2_per_capita: 'oil_co2_per_capita',
  temperature_change_from_co2: 'temperature_change_from_co2',
  temperature_change_from_ch4: 'temperature_change_from_ch4',
  temperature_change_from_n2o: 'temperature_change_from_n2o',
} as const;

export type ColumnKeys = keyof typeof Columns;

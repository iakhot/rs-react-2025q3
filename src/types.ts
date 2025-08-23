export interface FormData {
  name?: string;
  age?: number;
  email?: string;
  password?: string;
  gender?: Genders;
  acceptTerms?: boolean;
  image?: string;
  country?: Country;
}

export const GenderValues = ['male', 'female', 'other'] as const;
export type Genders = (typeof GenderValues)[number];

export const CountryValues = ['Russia', 'UK', 'USA'] as const;
export type Country = (typeof CountryValues)[number];

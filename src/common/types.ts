import { createContext } from 'react';

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

export const ModalContext = createContext({
  handleClose: () => {},
});

interface MessageObj {
  message: string;
}
export interface FormErrors {
  name?: MessageObj;
  age?: MessageObj;
  email?: MessageObj;
  password?: MessageObj;
  confirmPassword?: MessageObj;
  gender?: MessageObj;
  acceptTerms?: MessageObj;
  picture?: MessageObj;
  country?: MessageObj;
  accept?: MessageObj;
}

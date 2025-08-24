import type { FormData } from './types';
import { create } from 'zustand';

export const initialData: FormData = {
  name: '',
  age: undefined,
  email: '',
  password: '',
  gender: undefined,
  country: undefined,
  acceptTerms: false,
  image: undefined,
};

export type Store = {
  forms: Record<string, FormData>;
  receiveData: (key: string, data: FormData) => void;
  resetData: (key: string) => void;
};

export const useFormStore = create<Store>()((set) => ({
  forms: {},
  receiveData: (key: string, data: FormData) =>
    set((state) => ({ forms: { ...state.forms, [key]: data } })),
  resetData: (key: string) =>
    set((state) => {
      const { [key]: _, ...newForms } = state.forms;
      return { forms: newForms };
    }),
}));

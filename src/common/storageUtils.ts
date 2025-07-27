export const APP_KEY = 'RS-REACT-APP';
export interface Profile {
  searchTerm: string;
}

export const loadFromStorage = (): string | undefined => {
  const json: string | null = localStorage.getItem(APP_KEY);
  if (typeof json === 'string') {
    try {
      const state: Profile = JSON.parse(json);
      if (state.searchTerm !== '') {
        return state.searchTerm;
      }
    } catch {
      return undefined;
    }
  }
  return undefined;
};

export const saveToStorage = (searchTerm: string) => {
  const stateString = localStorage.getItem(APP_KEY);

  const state: Profile = stateString !== null ? JSON.parse(stateString) : {};

  state['searchTerm'] = searchTerm;
  localStorage.setItem(APP_KEY, JSON.stringify(state));
};

import { afterEach, beforeAll, type MockInstance } from 'vitest';
import { describe, expect, it, vi } from 'vitest';
import {
  APP_KEY,
  loadFromStorage,
  saveToStorage,
  type Profile,
} from './storageUtils';

describe('Storage utils', () => {
  let setStorageSpy: MockInstance;
  let getStorageSpy: MockInstance;
  const term = 'star wars';
  const profile: Profile = {
    searchTerm: term,
  };

  beforeAll(() => {
    setStorageSpy = vi.spyOn(Storage.prototype, 'setItem');
    getStorageSpy = vi.spyOn(Storage.prototype, 'getItem');
  });
  afterEach(() => {
    localStorage.clear();
    setStorageSpy.mockClear();
    getStorageSpy.mockClear();
  });

  it('saves search term', () => {
    saveToStorage(term);
    expect(setStorageSpy).toHaveBeenCalledWith(
      APP_KEY,
      JSON.stringify(profile)
    );
  });

  it('loads search term', () => {
    saveToStorage(term);
    expect(loadFromStorage()).toBe(term);
    expect(getStorageSpy).toBeCalledWith(APP_KEY);
  });

  it('returns undefined if term is not saved', () => {
    localStorage.clear();
    expect(loadFromStorage()).toBe(undefined);
    expect(getStorageSpy).toBeCalledWith(APP_KEY);
  });
});

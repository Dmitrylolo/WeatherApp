import ky from 'ky';

const BASE_CONFIG = {
  headers: {
    Accept: 'application/json',
  },
  retry: 2,
  timeout: 10_000,
};

export const instance = ky.extend(BASE_CONFIG);

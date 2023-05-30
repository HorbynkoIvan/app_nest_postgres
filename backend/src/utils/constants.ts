import { LanguageInterface } from './interfaces';

export const ONE_MONTH_MS = 2592000;
export const ONE_WEEK_MS = 604800;
export const ONE_DAY_MS = 86400;
export const ONE_HOUR_MS = 3600;

export const LANGUAGES: Record<string, LanguageInterface> = {
  ru: {
    tablePrefix: 'Ru',
    symbol: '',
    route: '',
  },
  ua: {
    tablePrefix: 'Ua',
    symbol: 'uk',
    route: 'ua',
  },
};

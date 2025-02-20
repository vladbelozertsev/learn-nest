import { ConfigService } from '@nestjs/config';

export const capitalize = (s: string) => {
  return (s && s[0].toUpperCase() + s.slice(1)) || '';
};

export const numberWithSpaces = (x: number) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
};

export const delkeys = <T extends { [key: string]: any }, Keys extends keyof T>(obj: T, keys: Keys[]) => {
  keys.forEach((key) => delete obj[key]);
  return obj as Omit<T, (typeof keys)[number]>;
};

export const isObj = (v: any) => {
  return (typeof v === 'object' || typeof v === 'function') && v !== null;
};

export const isDev = ($config: ConfigService) => {
  const MODE = $config.getOrThrow('MODE');
  return MODE === 'DEVELOPMENT';
};

export const wset = (prams: { [key: string]: any }) => {
  const arr = Object.entries(prams);
  const entries = arr.map((el) => [el[0], { set: el[1] }]);
  return Object.fromEntries(entries);
};

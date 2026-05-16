import { type Lang, languages, defaultLang } from './languages';
import en from './en.json';
import fr from './fr.json';

const translations: Record<Lang, Record<string, string>> = { en, fr };

export function useTranslation(lang: Lang) {
  return function t(key: string): string {
    return translations[lang]?.[key] ?? translations[defaultLang]?.[key] ?? key;
  };
}

const BASE = import.meta.env.BASE_URL ?? '/';

export function getLocalizedPath(lang: Lang, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const base = BASE.endsWith('/') ? BASE.slice(0, -1) : BASE;
  if (lang === defaultLang) return `${base}${cleanPath}`;
  return `${base}/${lang}${cleanPath === '/' ? '/' : cleanPath}`;
}

export function getDirection(lang: Lang): 'ltr' | 'rtl' {
  return languages[lang].dir;
}

export function getLangFromPath(path: string): Lang {
  const segment = path.split('/').filter(Boolean)[0];
  if (segment && segment in languages) return segment as Lang;
  return defaultLang;
}

export function getLocalizedContent<T = string>(content: Partial<Record<Lang, T>>, lang: Lang): T {
  return (content[lang] ?? content[defaultLang]) as T;
}

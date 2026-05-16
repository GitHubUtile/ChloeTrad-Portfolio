export type Lang = 'en' | 'fr';

export const languages: Record<Lang, { name: string; dir: 'ltr' | 'rtl'; label: string }> = {
  en: { name: 'English', dir: 'ltr', label: 'EN' },
  fr: { name: 'Français', dir: 'ltr', label: 'FR' },
};

export const defaultLang: Lang = 'en';

export function isValidLang(lang: string): lang is Lang {
  return lang in languages;
}

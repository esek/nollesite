import * as translations from '@/locales';
import { useRouter } from 'next/router';

type Locale = 'en' | 'sv';
const DEFAULT_LOCALE: Locale = 'sv';

/**
 * Gets the value from a provided key for the current locale
 * @param lang the locale to use
 * @param keys a string representing the key to use, ex. `'calendar.title'`
 * @returns the translated string or null
 */
const getNestedKeys = (lang: Locale, keys: string[]) =>
  keys.reduce((acc, curr) => {
    return acc?.[curr];
  }, translations[lang] as any);

/**
 * Hook to be able to use translations
 */
export const useLocale = () => {
  const { locale } = useRouter();

  /**
   * Takes a key and returns the translated string
   * @param key a string of an object key
   * @returns Either the translated string, or the default
   * locales translated string, or the key
   */
  const translate = (key: string) => {
    const keys = key.split('.');

    return (
      getNestedKeys(locale as Locale, keys) ??
      getNestedKeys(DEFAULT_LOCALE, keys) ??
      key
    );
  };

  return {
    locale: locale ?? DEFAULT_LOCALE,
    isSwedish: locale === DEFAULT_LOCALE,
    t: translate,
  };
};

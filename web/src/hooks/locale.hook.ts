import * as translations from '@/locales';
import { useRouter } from 'next/router';

type Locale = 'en' | 'sv';
const DEFAULT_LOCALE: Locale = 'sv';

const getNestedKeys = (lang: Locale, keys: string[]) =>
  keys.reduce((acc, curr) => {
    return acc?.[curr];
  }, translations[lang] as any);

export const useLocale = () => {
  const { locale } = useRouter();

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

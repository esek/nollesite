import {
  IndexProps,
  IndexPropsFound,
  IndexPropsNotFound,
} from '@/models/props';
import { Year } from '@/models/year';
import { buildNavLinks } from '@/utils/page.utils';
import { generateColors } from '@/utils/style.utils';
import { getAsync } from './axios';

const getCurrentYear = async (
  year: string,
  password: string,
  locale: string,
): Promise<IndexPropsFound | null> => {
  // fetches the year data from strapi
  const resp = await getAsync<Year>(`/years/${year}?password=${password}`, {
    locale,
  });

  if (!resp?.year) {
    return null;
  }

  // get the css colors
  const colors = generateColors(resp.colors);

  // build the nav links
  const navLinks = buildNavLinks(resp.content, locale);

  return {
    ...resp,
    navLinks,
    cssColors: colors,
    found: true,
  };
};

const getPreviousYears = async (
  locale: string,
): Promise<IndexPropsNotFound> => {
  const isSwe = locale === 'sv';
  const title = isSwe ? 'Nollningsåret hittades inte' : 'Year not found';
  const description = isSwe ? 'Nollningsåret hittades inte' : 'Year not found';

  const resp = await getAsync<Year[]>('/years', {});

  return {
    title,
    description,
    found: false,
    years: resp.toSorted((a, b) => Number(b.year) - Number(a.year)),
  };
};

export const getYearData = async (
  year: string,
  password: string,
  locale: string,
): Promise<IndexProps> => {
  const currentYear = await getCurrentYear(year, password, locale);

  if (currentYear) {
    return currentYear;
  }

  return getPreviousYears(locale);
};

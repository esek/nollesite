import { Content } from '@/models/content';
import { NavLink } from '@/models/nav';
import { IncomingMessage } from 'http';
import absoluteUrl from 'next-absolute-url';
import { Params } from 'next/dist/server/router';
import { serverConfig } from '../config.server';

/**
 * Converts
 * @param req
 * @returns
 */
export const parseSubdomainToYear = (req?: IncomingMessage): string => {
  if (!req) {
    return '/';
  }
  // Get the year parameter from the URL (if present)
  const { host } = absoluteUrl(req);
  const [year] = host.split('.');

  if (!year || !Number(year)) {
    return new Date().getFullYear().toString();
  }

  return year;
};

export const buildFullPath = (params: Params = {}): string => {
  const routePaths = params?.route?.join('/') ?? [];
  const fullRoute = `/${routePaths}`;

  return fullRoute;
};

export const imageUrl = (endpoint: string): string =>
  `${serverConfig.STRAPI_URL}${endpoint}`;

export const slugify = (str?: string): string => {
  if (!str) {
    return '';
  }
  return str
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[åä]/g, 'a')
    .replace(/[ö]/, 'o')
    .replace(/[^a-z0-9-]/g, '');
};

export const buildNavLinks = (
  content: Content[],
  locale: string
): NavLink[] => {
  const links: NavLink[] = [];
  const isSwe = locale === 'sv';

  content.forEach((c) => {
    switch (c.__component) {
      case 'content.text':
        if (!c.header) {
          return;
        }

        links.push({
          title: c.header,
          href: `#${slugify(c.header)}`,
        });
        break;
      case 'content.calendar':
        links.push({
          title: isSwe ? 'Kalender' : 'Calendar',
          href: `#calendar`,
        });
        break;
      case 'content.images':
        if (!c.title) {
          return;
        }

        links.push({
          title: c.title,
          href: `#${slugify(c.title)}`,
        });
        break;
      case 'content.nollekamp':
        links.push({
          title: 'Nollekamp',
          href: `#nollekamp`,
        });
        break;
      case 'content.sponsors':
        links.push({
          title: isSwe ? 'Sponsorer' : 'Sponsors',
          href: `#sponsors`,
        });
        break;
      case 'content.phoset':
        links.push({
          title: 'Phoset',
          href: `#phoset`,
        });
    }
  });

  return links;
};

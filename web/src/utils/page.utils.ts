import { Content } from '@/models/content';
import { NavLink } from '@/models/nav';
import { IncomingMessage } from 'http';
import absoluteUrl from 'next-absolute-url';
import { serverConfig } from '../config.server';

/**
 * Converts the subdomain into a year
 * if no subdomain is provided, it will return the current year
 * @param req the request from next
 * @returns the year as a string
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

/**
 * Converts just an endpoint to an entire strapi url
 * since the images are hosted on there
 * @param endpoint ex. /image.png
 * @returns ex. https://admin.nollning.esek.se/public/image.png
 */
export const imageUrl = (endpoint: string): string =>
  `${serverConfig.STRAPI_URL}${endpoint}`;

export const slugify = (str?: string): string => {
  if (!str) {
    return '';
  }
  return str
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[åäæ]/g, 'a')
    .replace(/[öø]/g, 'o')
    .replace(/[^a-z0-9-]/g, '');
};

/**
 * builds navlinks based on the content provided
 */
export const buildNavLinks = (
  content: Content[],
  locale: string,
): NavLink[] => {
  const isSwe = locale === 'sv';

  const links: NavLink[] = [];

  content.forEach((c) => {
    // all components have a "showInMenu" property, if this is false we just skip it
    if (!c.showInMenu) {
      return;
    }

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
      case 'content.image-with-text':
        if (!c.title) {
          return;
        }
        links.push({ title: c.title, href: `#${slugify(c.title)}` });
        break;
      case 'content.calendar':
        if (!c.calendarUrl) {
          return;
        }

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
        if (!c.sponsors?.length) {
          return;
        }
        links.push({
          title: isSwe ? 'Sponsorer' : 'Sponsors',
          href: `#sponsors`,
        });
        break;
      case 'content.phoset':
        links.push({
          title: 'Phøs',
          href: `#phos`,
        });
        break;
      case 'content.phaddergroups':
        links.push({
          title: isSwe ? 'Grupper' : 'Groups',
          href: `#groups`,
        });
        break;
      case 'content.contact':
        if (!c.title) {
          return;
        }

        links.push({
          title: c.title,
          href: `#${slugify(c.title)}`,
        });
        break;
    }
  });

  return links;
};

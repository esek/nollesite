import { IncomingMessage } from 'http';
import absoluteUrl from 'next-absolute-url';
import { Params } from 'next/dist/server/router';

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
  let year = host.split('/')[0];

  // if no year is present, default to the current year
  if (year === host) {
    year = new Date().getFullYear().toString();
  }

  return year;
};

export const buildFullPath = (params: Params = {}): string => {
  const routePaths = params?.route?.join('/') ?? [];
  const fullRoute = `/${routePaths}`;

  return fullRoute;
};

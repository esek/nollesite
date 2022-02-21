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

export const imageUrl = (endpoint: string) =>
  `${serverConfig.STRAPI_URL}${endpoint}`;

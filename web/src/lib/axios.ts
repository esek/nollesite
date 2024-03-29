import axios from 'axios';
import { serverConfig } from '../config.server';
import { clientConfig } from '../config.client';

/**
 * Creates an api instance to use towards
 * Strapi setting the baseUrl and authentication
 */
const api = axios.create({
  baseURL: `${clientConfig.STRAPI_URL}/api`,
  headers: {
    authorization: `Bearer ${serverConfig.STRAPI_API_TOKEN}`,
  },
});

export const getAsync = async <T>(
  endpoint: string,
  queryParams: Record<string, string | undefined>
) => {
  return api
    .get<T>(endpoint, {
      params: queryParams,
    })
    .then((res) => res.data);
};

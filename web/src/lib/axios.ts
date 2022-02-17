import axios from 'axios';
import { serverConfig } from '../config.server';

const api = axios.create({
  baseURL: `${serverConfig.STRAPI_URL}/api`,
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

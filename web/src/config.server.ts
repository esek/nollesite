export const serverConfig = {
  STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337',
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ?? '',
};

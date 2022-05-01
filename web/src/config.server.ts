export const serverConfig = {
  STRAPI_URL: process.env.STRAPI_URL ?? 'http://localhost:1337',
  STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN ?? '',
  GOOGLE_API_KEY: process.env.GOOGLE_API_KEY ?? '',
  EBREV_URL: process.env.EBREV_URL ?? 'http://localhost:8080',
  EBREV_API_KEY: process.env.EBREV_API_KEY ?? '',
};

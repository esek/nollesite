module.exports = ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  app: {
    keys: env.array('STRAPI_APP_KEYS'),
  },
  url: env('STRAPI_URL', 'http://localhost:1337'),
});

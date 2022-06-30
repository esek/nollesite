module.exports = ({ env }) => ({
  host: env('STRAPI_HOST', '0.0.0.0'),
  port: env.int('STRAPI_PORT', 1337),
  url: env('STRAPI_URL', 'http://localhost:1337'),
  app: {
    keys: env.array('STRAPI_APP_KEYS'),
  },
  webUrl: env('WEB_URL', 'https://nollning.esek.se'),
  wikiUrl: env('WIKI_URL', 'https://ddgwiki.esek.se'),
  wikiUsername: env('WIKI_USERNAME'),
  wikiPassword: env('WIKI_PASSWORD'),
});

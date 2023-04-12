const path = require('path');
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'sv',
    localeDetection: false,
  },
  images: {
    domains: ['localhost', '127.0.0.1', strapiUrl],
  },
};

module.exports = nextConfig;

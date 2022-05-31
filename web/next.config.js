const path = require('path');
const withPWA = require('next-pwa');

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
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

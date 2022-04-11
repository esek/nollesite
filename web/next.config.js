const path = require('path');
const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'src/styles')],
  },
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'sv',
  },
  images: {
    domains: ['localhost'],
  },
  pwa: {
    dest: 'public',
  },
});

module.exports = nextConfig;

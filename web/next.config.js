/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'sv'],
    defaultLocale: 'sv',
  },
  images: {
    domains: ['localhost'],
  },
};

module.exports = nextConfig;

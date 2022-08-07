const path = require('path');

const publicUrl = process.env.DEPLOY_URL ?? 'localhost:3000';

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
    domains: ['localhost', '127.0.0.1', publicUrl],
  },
  publicRuntimeConfig: {
    DEPLOY_URL: publicUrl,
  },
};

module.exports = nextConfig;

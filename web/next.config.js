const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const path = require('path');
const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://127.0.0.1:8000';

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

module.exports = withBundleAnalyzer(nextConfig);

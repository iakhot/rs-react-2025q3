/** @type {import('next').NextConfig} */
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig = {
  //   output: 'export',
  distDir: './dist',
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL('https://image.openmoviedb.com/kinopoisk-images/**'),
    ],
  },
  experimental: {
    cacheComponents: true,
  },
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);

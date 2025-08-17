/** @type {import('next').NextConfig} */
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
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'store.storeimages.cdn-apple.com',
      'images.samsung.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 
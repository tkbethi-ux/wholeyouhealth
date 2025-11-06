/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizeCss: false, // disables lightningcss
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

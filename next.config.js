/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Tell Next.js explicitly to use Webpack
  experimental: {
    turbo: false,
    optimizeCss: false, // disable lightningcss
  },

  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Force Webpack instead of Turbopack
  webpack: (config) => {
    return config;
  },

  // ✅ Disable LightningCSS entirely
  experimental: {
    optimizeCss: false,
  },

  // ✅ Firebase/Vercel compatibility
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

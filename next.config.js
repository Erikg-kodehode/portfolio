/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false  // Disable experimental CSS optimization for now
  },
  webpack: (config) => {
    // Add fallback configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    
    return config;
  },
}

module.exports = nextConfig

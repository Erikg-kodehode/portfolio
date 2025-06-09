/** @type {import('next').NextConfig} */
const path = require('path');

// Determine the environment
const env = process.env.NODE_ENV || 'development';

// Load environment-specific .env file
require('dotenv').config({
  path: `.env.${env}`,
});

const nextConfig = {
  // Force clean build to avoid caching issues
  generateBuildId: async () => {
    return 'clean-build-' + Date.now();
  },
  webpack: (config, { isServer }) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname),
    };

    // Add fallback configuration and explicitly exclude MongoDB
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      mongodb: false,  // Explicitly declare no mongodb
      mongoose: false, // Explicitly declare no mongoose
    };

    // Ensure proper resolution of React components
    config.resolve.extensions = [
      '.tsx', '.ts', '.js', '.jsx', '.json', ...config.resolve.extensions || []
    ];

    // Ensure proper handling of ESM/CommonJS
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.m?js$/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(tsx|ts|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['next/babel'],
            },
          },
        },
      ],
    };
    
    // Simplify chunk splitting - use Next.js defaults but with minor customization
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          defaultVendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  // Enable strict mode for better performance in development
  reactStrictMode: true,
  experimental: {
    esmExternals: true
  }
};

module.exports = nextConfig;

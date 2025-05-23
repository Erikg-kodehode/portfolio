/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true  // Keep CSS optimization enabled
  },
  webpack: (config, { isServer }) => {
    // Add fallback configuration
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
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
}

module.exports = nextConfig

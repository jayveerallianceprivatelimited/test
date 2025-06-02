/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'], // Add domains for external images if needed
  },
  swcMinify: true, // Use SWC for minification (faster than Terser)
  trailingSlash: true, // Add trailing slashes to URLs for better compatibility with static hosting
  poweredByHeader: false, // Remove X-Powered-By header for security
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Ensure compatibility with various static hosting providers
  basePath: '',
  // Disable certain features not needed for static sites
  experimental: {
    serverActions: false,
  },
};

module.exports = nextConfig;

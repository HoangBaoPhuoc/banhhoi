/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Disable client-side router cache for dynamic routes so filter/sort
    // changes fetch fresh RSC from the server without needing router.refresh()
    staleTimes: { dynamic: 0 },
  },
};

module.exports = nextConfig;

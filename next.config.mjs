/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  serverRuntimeConfig: {
    oldestArticleDays: 30,
    unreadPageSize: 10,
  },
};

export default nextConfig;

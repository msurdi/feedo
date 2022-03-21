/**
 * @type {import('next').NextConfig}
 */
const config = {
  serverRuntimeConfig: {
    oldestArticleDays: 30,
    unreadPageSize: 10,
  },
};

export default config;

/**
 * @type {import('next').NextConfig}
 */
const config = {
  serverRuntimeConfig: {
    oldestArticleDays: 30,
    unreadPageSize: 10,
    auth: {
      username: process.env.FEEDO_USERNAME,
      password: process.env.FEEDO_PASSWORD,
      enabled: !!process.env.FEEDO_USERNAME || !!process.env.FEEDO_PASSWORD,
    },
  },
};

export default config;

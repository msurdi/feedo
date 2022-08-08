import withPWA from "next-pwa";

/**
 * @type {import('next').NextConfig}
 */
export const config = {
  pwa: {
    dest: "public",
    disable: process.env.NODE_ENV === "development",
  },
  serverRuntimeConfig: {
    oldestArticleDays: 30,
    unreadPageSize: 20,
    syncPageSize: 200,
    auth: {
      username: process.env.FEEDO_USERNAME,
      password: process.env.FEEDO_PASSWORD,
      enabled: !!process.env.FEEDO_USERNAME || !!process.env.FEEDO_PASSWORD,
    },
  },
};

export default withPWA(config);

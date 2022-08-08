import { isBefore, subDays } from "date-fns";
import { config } from "../../next.config.js";

const {
  serverRuntimeConfig: { oldestArticleDays },
} = config;

export const getOldestDate = () => subDays(new Date(), oldestArticleDays);

export const isExpired = (date) => {
  const oldestDate = getOldestDate();
  return isBefore(date, oldestDate);
};

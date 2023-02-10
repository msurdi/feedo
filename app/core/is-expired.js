import { isBefore, subDays } from "date-fns";
import config from "../config.js";

export const getOldestDate = () =>
  subDays(new Date(), config.feedo.oldestArticleDays);

export const isExpired = (date) => {
  const oldestDate = getOldestDate();
  return isBefore(date, oldestDate);
};

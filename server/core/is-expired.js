const { isBefore, subDays } = require("date-fns");
const config = require("../config");

const getOldestDate = () => subDays(new Date(), config.feedo.oldestArticleDays);

const isExpired = (date) => {
  const oldestDate = getOldestDate();
  return isBefore(date, oldestDate);
};

module.exports = { isExpired, getOldestDate };

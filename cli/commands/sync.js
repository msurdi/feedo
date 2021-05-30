const { syncAllFeeds } = require("../../server/core/sync");

const sync = async () => syncAllFeeds();

module.exports = sync;

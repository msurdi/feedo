const html = require("html-string");
const urls = require("../urls");
const layout = require("./components/layout");

module.exports = () =>
  layout({
    body: html` <div><a href="${urls.feeds()}">My Feeds</a></div> `,
  });

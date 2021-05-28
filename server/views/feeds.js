const html = require("html-string");
const layout = require("./components/layout");

module.exports = () =>
  layout({
    body: html` <div>Feeds</div> `,
  });

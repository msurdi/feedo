const html = require("html-string");
const urls = require("../urls");
const layout = require("./components/layout");
const link = require("./components/link");

module.exports = () =>
  layout({
    body: html` <div class="flex flex-row justify-between">
      <h1 class="text-lg font-bold py-4">My feeds</h1>
      ${link("Add Feed", {
        variant: link.variants.button,
        upTarget: "body",
        href: urls.newFeed(),
      })}
    </div>`,
  });

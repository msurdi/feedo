const html = require("html-string");
const urls = require("../urls");
const layout = require("./components/layout");

module.exports = () =>
  layout({
    body: html` <div class="flex flex-row justify-between">
      <h1 class="text-lg font-bold py-4">My feeds</h1>
      <a
        up-target="body"
        class="my-4 w-auto py-2 rounded transition-colors duration-200 border-gray-400 disabled:bg-gray-500 shadow inline-flex items-center justify-center px-4 text-white bg-success hover:bg-success-light "
        href="${urls.newFeed()}"
        >Add Feed</a
      >
    </div>`,
  });

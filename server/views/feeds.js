const html = require("html-string");
const urls = require("../urls");
const layout = require("./components/layout");
const link = require("./components/link");

const feedsView = ({ feeds } = {}) =>
  layout({
    body: html`
      <div class="flex flex-row justify-between">
        <h1 class="text-lg font-bold py-4">My feeds</h1>
        ${link("Add Feed", {
          variant: link.variants.button,
          upTarget: "body",
          href: urls.newFeed(),
        })}
      </div>
      <div class="py-4">
        <ul id="feed-list" class="divide-y divide-gray-300">
          ${feeds.map(
            (feed) => html`
              <li>
                <div
                  class="flex flex-col items-start sm:flex-row sm:justify-between py-2 sm:items-baseline"
                >
                  ${feed.url}
                  <form
                    up-target="#feed-list"
                    up-method="delete"
                    up-confirm="Are you sure?"
                    action="${urls.deleteFeed(feed.id)}"
                    class="flex flex-col"
                  >
                    <button
                      class="my-4 w-auto py-2 text-danger text-sm background-transparent font-bold uppercase outline-none focus:outline-none ease-linear disabled:text-gray-400"
                      type="submit"
                    >
                      Unsubscribe
                    </button>
                  </form>
                </div>
              </li>
            `
          )}
        </ul>
      </div>
    `,
  });

module.exports = feedsView;

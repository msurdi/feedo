const html = require("html-string");
const urls = require("../../urls");
const button = require("../components/button");
const csrfInput = require("../components/csrf-input");
const input = require("../components/input");
const layout = require("../components/layout");

const newFeedView = ({ req, feed, errors } = {}) =>
  layout({
    body: html`
      <div class="flex flex-row justify-center my-6">
        <form
          up-target="body"
          method="post"
          action="${urls.newFeed()}"
          class="flex flex-col w-full max-w-xl"
        >
          ${csrfInput(req.csrfToken())}
          <fieldset class="m-2 md:flex flex flex-col">
            <label class="py-1 text-sm font-bold" for="url"> Feed url </label>
            ${input({
              id: "url",
              name: "url",
              placeholder: "https://example.com/rss",
              autofocus: !feed?.url,
              value: feed?.url || "",
            })}
            ${errors?.url &&
            html`<span class="text-danger ">${errors.url}</span>`}
          </fieldset>
          <div class="m-2 flex flex-row justify-end">
            ${button("Add feed", {
              upDisable: true,
              dataDisableWith: "Saving...",
            })}
          </div>
        </form>
      </div>
    `,
  });

module.exports = newFeedView;

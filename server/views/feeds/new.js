const html = require("html-string");
const urls = require("../../urls");
const button = require("../components/button");
const input = require("../components/input");
const layout = require("../components/layout");
const pageHeader = require("../components/page-header");

module.exports = ({ feed, errors } = {}) =>
  layout({
    body: html`
      ${pageHeader({ title: "Add new feed" })}
      <div class="flex flex-row justify-center my-6">
        <form
          up-target="body"
          method="POST"
          action="${urls.newFeed()}"
          class="flex flex-col w-full max-w-xl"
        >
          <fieldset class="m-2 md:flex flex flex-col">
            ${input({
              id: "url",
              name: "url",
              placeholder: "Url",
              autofocus: !feed?.url,
              value: feed?.url || "",
            })}
            ${errors?.url &&
            html`<span class="text-danger ">${errors.url}</span>`}
          </fieldset>
          <div class="m-2 flex flex-row justify-end">${button("Add feed")}</div>
        </form>
      </div>
    `,
  });

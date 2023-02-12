import html from "html-string";
import urls from "../../urls.js";
import button from "../components/button.js";
import input from "../components/input.js";
import layout from "../components/layout.js";

const newFeedView = ({ feed, errors } = {}) =>
  layout({
    body: html`
      <div class="flex flex-row justify-center my-6">
        <form
          up-target="body"
          method="post"
          action="${urls.newFeed()}"
          class="flex flex-col w-full max-w-xl"
        >
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
export default newFeedView;

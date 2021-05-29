const html = require("html-string");
const urls = require("../../urls");
const layout = require("../components/layout");
const pageHeader = require("../components/page-header");

module.exports = () =>
  layout({
    body: html`
      ${pageHeader({ title: "Add new feed" })}
      <div class="flex flex-row justify-center my-6">
        <form
          method="POST"
          action="${urls.newFeed()}"
          class="flex flex-col w-full max-w-xl"
        >
          <div class="m-2 md:flex flex flex-col">
            <input
              type="text"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
              id="url"
              placeholder="Url"
              name="url"
            />
          </div>
          <div class="m-2 flex flex-row justify-end">
            <button
              class="py-2 px-6 rounded transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none shadow text-white bg-primary hover:bg-primary-light w-auto bg-success"
              type="submit"
            >
              Add feed
            </button>
          </div>
        </form>
      </div>
    `,
  });

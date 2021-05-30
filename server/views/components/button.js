const html = require("html-string");

const button = (children, { type = "submit", ...attrs } = {}) => html` <button
  class="py-2 px-6 rounded transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:shadow-none shadow text-white bg-primary hover:bg-primary-light w-auto bg-success"
  type="${type}"
  ${attrs}:attrs
>
  ${children}
</button>`;

module.exports = button;

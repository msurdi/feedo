const html = require("html-string");

module.exports = ({ title }) => html`
  <h1 class="text-lg font-bold py-4">${title}</h1>
`;

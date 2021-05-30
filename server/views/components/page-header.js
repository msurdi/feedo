const html = require("html-string");

const pageHeader = ({ title }) => html`
  <h1 class="text-lg font-bold py-4">${title}</h1>
`;
module.exports = pageHeader;

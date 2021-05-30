const html = require("html-string");

const csrfInput = (csrfToken) => html`
  <input type="hidden" name="_csrf" value="${csrfToken}" />
`;
module.exports = csrfInput;

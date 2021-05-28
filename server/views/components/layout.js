const html = require("html-string");
const config = require("../../config");
const urls = require("../../urls");

module.exports = ({ body }) => html`
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <title>Feedo</title>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, user-scalable=no"
      />
      <script src="${urls.public("dist/app.js")}"></script>
      <link rel="stylesheet" href="${urls.public("dist/app.css")}" />
      ${config.reload && html`<script src="/reload/reload.js"></script>`}
    </head>
    <body class="bg-primary"></body>
      <header></header>
      <main>${body}</main>
      <footer></footer>
    </body>
  </html>
`;

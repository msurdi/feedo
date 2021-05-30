const html = require("html-string");
const config = require("../../config");
const urls = require("../../urls");
const link = require("./link");

const layout = ({ body }) => html`
  <!DOCTYPE html>
  <html class="h-full">
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
    <body
      class="h-full min-h-full bg-gray-100 pt-12 overflow-hidden"
      up-progress
    >
      <header
        class="z-50 flex flex-row justify-between bg-primary shadow items-baseline fixed top-0 left-0 right-0 h-12"
      >
        ${link("Feedo", {
          variant: link.variants.brand,
          href: urls.home(),
          upTarget: "body",
        })}
        ${link("Feeds", {
          variant: link.variants.nav,
          href: urls.feeds(),
          upTarget: "body",
        })}
      </header>
      <main
        class="h-full p-4 w-full max-w-6xl bg-white mx-auto rounded shadow overflow-y-scroll"
      >
        ${body}
      </main>
      <footer></footer>
    </body>
  </html>
`;

module.exports = layout;

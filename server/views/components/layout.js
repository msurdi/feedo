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
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#075985" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-status-bar" content="#075985" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <title>Feedo</title>
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

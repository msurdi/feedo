const html = require("html-string");
const config = require("../../config");
const urls = require("../../urls");
const link = require("./link");

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
    <body class="h-full">
      <header>
        <nav
          class="z-50 flex flex-row justify-between bg-primary shadow items-baseline sticky top-0"
        >
          ${link({
            variant: link.variants.brand,
            children: "Feedo",
            href: urls.home(),
            upTarget: "body",
          })}
          ${link({
            variant: link.variants.nav,
            children: "Feeds",
            href: urls.feeds(),
            upTarget: "body",
          })}
        </nav>
      </header>
      <main
        class="p-4 w-full max-w-6xl min-h-full bg-white mx-auto rounded shadow flex-grow"
      >
        ${body}
      </main>
      <footer></footer>
    </body>
  </html>
`;

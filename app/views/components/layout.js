import html from "html-string";
import config from "../../config.js";
import assets from "../../lib/assets.js";
import urls from "../../urls.js";
import link from "./link.js";

const layout = ({ body }) => html`
  <!DOCTYPE html>
  <html class="h-full">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <link
        rel="manifest"
        href="/manifest.json"
        crossorigin="use-credentials"
      />
      <meta name="theme-color" content="#075985" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <meta name="apple-mobile-web-app-status-bar" content="#075985" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
      <title>Feedo</title>
      ${config.devMode &&
      html`<script
          type="module"
          src="http://localhost:5173/@vite/client"
        ></script>
        <script
          type="module"
          src="http://localhost:5173/assets/app.js"
        ></script>
        <link rel="stylesheet" href="http://localhost:5173/assets/app.css" /> `}
      ${!config.devMode &&
      html`<script src="${urls.asset(assets["assets/app.js"].file)}"></script>
        <link
          rel="stylesheet"
          href="${urls.asset(assets["assets/app.css"].file)}"
        />`}
    </head>
    <body class="h-full bg-gray-100 pt-12">
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
      <div class="h-full w-full overflow-y-scroll" up-viewport>
        <main
          class="min-h-full p-4 w-full max-w-6xl bg-white mx-auto rounded shadow"
        >
          ${body}
        </main>
      </div>
      <footer></footer>
    </body>
  </html>
`;

export default layout;

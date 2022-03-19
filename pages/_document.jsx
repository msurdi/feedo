import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html>
    <Head>
      <link
        rel="manifest"
        href="/manifest.json"
        crossOrigin="use-credentials"
      />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
    <body className="h-full pt-12 bg-gray-100">
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;

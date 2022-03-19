import Head from "next/head";
import urls from "../lib/urls";
import Link from "./link";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Feedo</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#075985" />
      <meta name="apple-mobile-web-app-status-bar" content="#075985" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
      />
    </Head>
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-row items-baseline justify-between h-12 shadow bg-primary">
      <Link variant={Link.variants.brand} href={urls.home()}>
        Feedo
      </Link>
      <Link variant={Link.variants.nav} href={urls.feeds()}>
        Feeds
      </Link>
    </header>
    <div className="w-full h-full overflow-y-scroll">
      <main className="w-full max-w-6xl min-h-full p-4 mx-auto bg-white rounded shadow">
        {children}
      </main>
    </div>
    <footer />
  </>
);

export default Layout;

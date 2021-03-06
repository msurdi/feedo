import Head from "next/head";
import { useRouter } from "next/router";
import urls from "../lib/urls.js";
import Link from "./link.jsx";

const Layout = ({ children }) => {
  const router = useRouter();

  const isHome = router.asPath === urls.home();

  return (
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
      <div className="flex h-screen flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 flex h-12 flex-row items-baseline justify-between bg-primary shadow">
          <Link
            external={isHome}
            variant={Link.variants.brand}
            href={urls.home()}
          >
            Feedo
          </Link>
          <Link variant={Link.variants.nav} href={urls.feeds()}>
            Feeds
          </Link>
        </header>
        <main id="viewport" className="h-content mt-12 overflow-y-scroll ">
          <div className="min-h-content mx-auto w-full max-w-6xl rounded bg-white px-4 shadow">
            {children}
          </div>
        </main>
        <footer />
      </div>
    </>
  );
};

export default Layout;

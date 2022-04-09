import { useRouter } from "next/router";
import { useCallback } from "react";

const isServer = typeof window === "undefined";

export const withLazy = (handler) => async (context) => {
  const response = await handler(context);
  const only = context.query?.nextLazy?.split(",");

  if (response.props) {
    const propsKeys = Object.keys(response.props);

    for (const key of propsKeys) {
      if (only && !only.includes(key)) {
        delete response.props[key];
        continue;
      }
      if (typeof response.props[key] === "function") {
        response.props[key] = await response.props[key]();
      }
    }

    if (only) {
      response.props.nextLazy = only;
    }
  }

  return response;
};

export const lazyApp = (app) => {
  let cache = {};
  return function LazyApp({ pageProps, ...rest }) {
    const router = useRouter();
    const path = router.asPath;

    if (isServer) {
      return app({ pageProps, ...rest });
    }

    if (!pageProps?.nextLazy) {
      cache = { [path]: pageProps };
      return app({ pageProps, ...rest });
    }

    if (!cache[path]) {
      return app({ pageProps, ...rest });
    }

    return app({ pageProps: { ...cache[path], ...pageProps }, ...rest });
  };
};

export const useLazyRefresh = () => {
  const router = useRouter();

  const refresh = useCallback(
    async ({ only, ...options } = {}) =>
      router.replace(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            ...(only ? { nextLazy: only } : {}),
          },
        },
        router.asPath,
        options
      ),
    [router]
  );

  return refresh;
};

import { NextResponse } from "next/server";
import urls from "../lib/urls.js";
import config from "../next.config.js";

const {
  serverRuntimeConfig: {
    auth: { username, password, enabled },
  },
} = config;

// eslint-disable-next-line import/prefer-default-export
export const middleware = (req) => {
  if (req.page.name === urls.status()) {
    return NextResponse.next();
  }
  if (!enabled) {
    return NextResponse.next();
  }
  const basicAuth = req.headers.get("authorization");

  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [providedUsername, providedPassword] = atob(auth).split(":");

    if (providedUsername === username && providedPassword === password) {
      return NextResponse.next();
    }
  }

  return new Response("Auth required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
};

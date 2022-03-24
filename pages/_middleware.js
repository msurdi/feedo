import { NextResponse } from "next/server";
import urls from "../lib/urls";
import config from "../next.config";

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
    const [providedUsername, providedPassword] = Buffer.from(auth, "base64")
      .toString()
      .split(":");

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

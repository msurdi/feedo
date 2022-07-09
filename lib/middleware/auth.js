import { noop } from "lodash-es";
import config from "../../next.config.js";
import urls from "../urls.js";

const {
  serverRuntimeConfig: {
    auth: { username, password, enabled },
  },
} = config;

// eslint-disable-next-line import/prefer-default-export
const middleware = (req, res, next = noop) => {
  if (req.page?.name === urls.status()) {
    return next();
  }
  if (!enabled) {
    return next();
  }
  const basicAuth = req.headers.authorization;
  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [providedUsername, providedPassword] = atob(auth).split(":");

    if (providedUsername === username && providedPassword === password) {
      return next();
    }
  }
  res.statusCode = 401;
  res.setHeader("WWW-Authenticate", `Basic realm="Secure Area"`);
  res.end("Auth required");
  return null;
};

export default middleware;

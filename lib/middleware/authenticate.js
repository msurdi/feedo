import { StatusCodes } from "http-status-codes";
import config from "../../next.config.js";
import urls from "../urls.js";

const {
  serverRuntimeConfig: {
    auth: { username, password, enabled },
  },
} = config;

// eslint-disable-next-line import/prefer-default-export
const authenticate = (handler) => (req, res) => {
  if (req.page?.name === urls.status()) {
    return handler(req, res);
  }
  if (!enabled) {
    return handler(req, res);
  }
  const basicAuth = req.headers.authorization;
  if (basicAuth) {
    const auth = basicAuth.split(" ")[1];
    const [providedUsername, providedPassword] = Buffer.from(auth, "base64")
      .toString()
      .split(":");

    if (providedUsername === username && providedPassword === password) {
      return handler(req, res);
    }
  }
  res.statusCode = StatusCodes.UNAUTHORIZED;
  res.setHeader("WWW-Authenticate", `Basic realm="Secure Area"`);
  res.end("Auth required");
  return null;
};

export default authenticate;

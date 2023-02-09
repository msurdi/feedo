import expressBasicAuth from "express-basic-auth";
import { pathToRegexp } from "path-to-regexp";
import config from "../config.js";

const authMiddleware = ({ excludeUrls = [] } = {}) => {
  const { username, password } = config.auth;

  if (!username && !password) {
    return (req, res, next) => next();
  }

  const auth = expressBasicAuth({
    users: { [username]: password },
    challenge: true,
  });

  return (req, res, next) => {
    for (const excludeUrl of excludeUrls) {
      const urlRegex = pathToRegexp(excludeUrl);
      if (urlRegex.test(req.url)) {
        return next();
      }
    }
    return auth(req, res, next);
  };
};

export default authMiddleware;

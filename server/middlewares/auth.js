const { pathToRegexp } = require("path-to-regexp");

const expressBasicAuth = require("express-basic-auth");

const config = require("../config");

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

module.exports = authMiddleware;

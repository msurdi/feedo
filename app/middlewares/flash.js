const flashMiddleware = () => async (req, res, next) => {
  req.flash = (type, message) => {
    req.flashMessages ||= {};

    if (type && message) {
      req.flashMessages[type] = message;
      return null;
    }

    if (type) {
      const value = req.flashMessages[type];
      delete req.flashMessages[type];
      return value;
    }

    req.flashMessages = {};
    return null;
  };

  const result = await next();

  return result;
};

export default flashMiddleware;

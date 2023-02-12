const flashMiddleware = () => async (req, res, next) => {
  req.flash = (type, message) => {
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

  req.flashMessages = req.session.flash || {};
  const result = await next();
  req.session.flash = req.flashMessages;

  return result;
};

export default flashMiddleware;

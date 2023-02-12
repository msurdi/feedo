const flashMiddleware = () => (req, res, next) => {
  req.flash = (type, message) => {
    req.session.flash ||= {};

    if (type && message) {
      req.session.flash[type] = message;
      return null;
    }

    if (type) {
      const value = req.session.flash[type];
      delete req.session.flash[type];
      return value;
    }

    req.session.flash = {};
    return null;
  };
  return next();
};

export default flashMiddleware;

var parseNums = require('./lib/parse');

module.exports = function(options) {
  options = options || {};

  if (!options.parser) {
    options.parser = parseInt;
  }

  if (!options.protect) {
    options.protect = function () {
      return false;
    };
  }

  return function(req, res, next) {
    req.query = parseNums(req.query, options);
    next();
  };
};

const { CustomAPIError } = require('../errors/custom-error');
const ErrorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(500).json({ msg: err.message });
  }
  return res.status(500).json({ msg: `Something went wrong, try again later` });
};

module.exports = ErrorHandlerMiddleware;

const { CustomAPIError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log("error handler middlaware block");
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  res.status(500).json({ msg: "Something went wrong, please try again " });
};

module.exports = errorHandlerMiddleware;

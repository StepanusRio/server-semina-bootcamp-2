const CustomAPIError = require("./custom-api-error");
const BadRequestError = require("./bad-request");
const NotFoundError = require("./not-found");
const UnAuthenticationError = require("./unauthentication")
const UnAuthorizedError = require("./unauthorized")

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnAuthenticationError,
  UnAuthorizedError,
};

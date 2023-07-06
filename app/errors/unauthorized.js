const { StatusCodes } = require("http-status-codes");
const CustomErrorAPI = require("./custom-api-error")
class Unauthorized extends CustomErrorAPI {
  constructor(message) {
    super(message)
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
module.exports = Unauthorized;
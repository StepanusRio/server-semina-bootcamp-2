const { StatusCodes } = require("http-status-codes");
const { getAllOrders } = require("../../../services/mongoose/serviceOrders");
const index = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { index };

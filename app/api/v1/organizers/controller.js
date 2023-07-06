const { StatusCodes } = require("http-status-codes");
const { createOrganizer, createUser } = require("../../../services/mongoose/serviceUser");


const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req)
    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

const createCMSUsers = async (req, res, next) => {
  try {
    const result = await createUser(req)
    res.status(StatusCodes.CREATED).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

module.exports = { createCMSOrganizer, createCMSUsers };
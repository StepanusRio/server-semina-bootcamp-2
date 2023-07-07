const { StatusCodes } = require("http-status-codes");
const { createOrganizer, createUser, getAllUsers } = require("../../../services/mongoose/serviceUser");

const getCMSAllUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers()
    res.status(StatusCodes.OK).json({
      data: result
    })
  } catch (error) {
    next(error)
  }
}

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

module.exports = { createCMSOrganizer, createCMSUsers, getCMSAllUsers };
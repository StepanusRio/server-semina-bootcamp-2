// Import Status Code
const { StatusCodes, OK } = require("http-status-codes")
// Import Services
const { getAllCategories, createCategories, getOneCategories, updateCategories, deleteCategories } = require("../../../services/mongoose/serviceCategories")

// Create Categories Function
const create = async (req, res, next) => {
  try {
    const result = await createCategories(req);
    res.status(StatusCodes.CREATED).json({
      error: false,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Categories Fucntions
const index = async (req, res, next) => {
  try {
    const result = await getAllCategories(req);
    res.status(StatusCodes.OK).json({
      error: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Find Categories Functions
const find = async (req, res, next) => {
  try {
    const result = await getOneCategories(req);
    res.status(StatusCodes.OK).json({
      error: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Update Categories Functions
const update = async (req, res, next) => {
  try {
    const result = await updateCategories(req);
    res.status(StatusCodes.OK).json({
      error: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Categories Functions
const destroy = async (req, res, next) => {
  try {
    const result = await deleteCategories(req);
    res.status(StatusCodes.OK).json({
      error: false,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  create,
  index,
  find,
  update,
  destroy,
};

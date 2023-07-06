const { StatusCodes } = require("http-status-codes");

const { getAllTalent,
  getOneTalent,
  createTalent,
  updateTalent,
  deleteTalent
} = require("../../../services/mongoose/serviceTalents");

const create = async (req, res, next) => {
  try {
    const result = await createTalent(req);
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
    const result = await getAllTalent(req);
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
    const result = await getOneTalent(req);
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
    const result = await updateTalent(req);
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
    const result = await deleteTalent(req);
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
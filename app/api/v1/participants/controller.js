const {
  signupParticipant,
  activateParticipant,
  signinParticipant,
  getAllEvents,
  getOneEvent,
  getAllOrders,
  checkoutOrder
} = require('../../../services/mongoose/serviceParticipants');

const { StatusCodes } = require('http-status-codes');

const signup = async (req, res, next) => {
  try {
    const result = await signupParticipant(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const activeParticipant = async (req, res, next) => {
  try {
    const result = await activateParticipant(req);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (error) {
    next(error)
  }
}

const signin = async (req, res, next) => {
  try {
    const result = await signinParticipant(req);
    res.status(StatusCodes.OK).json({
      data: { token: result },
    });
  } catch (error) {
    next(error)
  }
}

const getAllLandingPage = async (req, res, next) => {
  try {
    const result = await getAllEvents(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDashboard = async (req, res, next) => {
  try {
    const result = await getAllOrders(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getDetailLandingPage = async (req, res, next) => {
  try {
    const result = await getOneEvent(req);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

// const getAllPayment = async (req, res, next) => {
//   try {
//     const result = await getAllPaymentByOrganizer(req);

//     res.status(StatusCodes.OK).json({
//       data: result,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const checkout = async (req, res, next) => {
  try {
    const result = await checkoutOrder(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  activeParticipant,
  signin,
  getAllLandingPage,
  getDetailLandingPage,
  getDashboard,
  checkout,
  // getAllPayment,
};
const express = require("express");
const { createCMSOrganizer, createCMSUsers, getCMSAllUsers } = require("./controller");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")

router.get("/organizers",
  authenticateUser,
  authorizeRoles('owner'), getCMSAllUsers);
router.post('/organizers',
  authenticateUser,
  authorizeRoles('owner'), createCMSOrganizer);
router.post('/users',
  authenticateUser,
  authorizeRoles('organizer'), createCMSUsers);

module.exports = router;

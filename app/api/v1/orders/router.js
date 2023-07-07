const express = require("express");
const { index } = require("./controller");
const router = express.Router();
const { authenticateUser, authorizeRoles } = require("../../../middlewares/auth")
router.get("/orders",
  authenticateUser,
  authorizeRoles('organizer', 'admin', 'owner'), index);
module.exports = router;
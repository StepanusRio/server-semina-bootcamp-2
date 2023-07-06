const express = require("express");
const { createCMSOrganizer, createCMSUsers } = require("./controller");
const { authenticateUser } = require("../../../middlewares/auth")
const router = express.Router();

router.post('/organizers', createCMSOrganizer);
router.post('/users', authenticateUser, createCMSUsers);

module.exports = router;

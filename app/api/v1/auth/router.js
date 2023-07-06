const { signInCMS } = require("./controller");
const express = require("express");
const router = express.Router();

router.post('/auth/signin', signInCMS);

module.exports = router;

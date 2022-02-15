"use strict";

const express = require("express");
const router = express.Router();
const signupHundlers = require("../controllers/signupControllers");

router.post('/', signupHundlers.signup);


module.exports = router;
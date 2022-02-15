"use strict"

const express = require("express");
const router = express.Router();
const signoutHundlers = require("../controllers/signoutControllers");

router.post('/', signoutHundlers.signout);


module.exports =router;
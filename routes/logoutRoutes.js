"use strict";
const express = require("express");
const router = express.Router();
const logoutHundlers = require("../controllers/logoutControllers");


    
router.post('/',logoutHundlers.logout);

module.exports = router


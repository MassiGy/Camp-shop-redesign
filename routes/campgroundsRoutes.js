"use strict";

const express = require("express");
const router = express.Router();
const campgroundHundelers = require("../controllers/campgroundControllers");


router.get('/', campgroundHundelers.renderAllCamps);
router.post("/search", campgroundHundelers.search);


module.exports = router;
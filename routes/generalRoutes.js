"use strict";

const express = require("express");
const router = express.Router();
const general_events_hundlers = require("../controllers/generalControllers");


router.get("/home", general_events_hundlers.renderHome);
router.get("/about", general_events_hundlers.renderAbout);
router.get('/', general_events_hundlers.renderHome);

router.post("/sendEmail", general_events_hundlers.sendEmail);

module.exports = router;
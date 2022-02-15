"use strict"
const express = require("express");
const router = express.Router();
const passport = require("passport");



router.post('/', passport.authenticate(
    // first we need to specify the strategy
    // strategy === local, means that we are using our db 
    "local",                                             
    // second, set up some params.
    // failureFlash message is equal by default to : Username or password incorrect.
    // then set up the rederection.   
    {
        failureFlash: true,
        successFlash: "Welcome Back!",
        successRedirect: "/camps#popup-feedback_message",
        failureRedirect: "/home#popup-feedback_message"
    }));

module.exports = router


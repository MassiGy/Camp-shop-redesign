"use strict";
const User = require("../modals/User");
const passport = require("passport");

module.exports.signup = (req, res) => {
    User.register(
        // first step: create a new user document in our db
        // just by using the username and the email feilds (sub creation)
        new User({
            username: req.body.username,
            email: req.body.email,
        }),

        // second step: pass the typed password to the register
        // method in order to hash it, (add salt + hash)
        req.body.password,

        // third step hundel errors via a callback
        // errors like: Username taken, Wrong data types...
        function (err) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("/home#popup-feedback_message");
            } else {
                // fourth step: authenicate the uesr, and store the hashed
                // password in the data base, then perform a simple redirection
                passport.authenticate("local")(req, res, function () {
                    req.flash("success", "Seccessfuly Signed Up!");
                    res.redirect("/camps#popup-feedback_message");
                });
            }
        }
    )
}


"use strict";



module.exports.logout = (req, res) => {
    req.logout(err => {
        if (err) {
            req.flash("error", "Something went wrong on logout ! We will work on it soon.");
            return res.redirect("/home#popup-feedback_message");
        }
        req.flash("success", "Successfully Logged Out. Bye!")
        res.redirect("/home#popup-feedback_message");
    });

}
"use strict";



module.exports.logout = (req,res) => {
    req.logout();
    req.flash("success", "Successfully Logged Out. Bye!")
    res.redirect("/home#popup-feedback_message");
}
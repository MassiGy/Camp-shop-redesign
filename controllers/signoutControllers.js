"use strict";

const User  = require("../modals/User");

module.exports.signout = async(req, res)=> {
    try{
        // we need to find the user documents in our db.
        // NOTE: we can not use the req.body.password, cuz in our db our password are hashed.
        // after finding it remove it, 
        // NOTE: the mongoose middelware will also delete the req.user feilds value, 
        // so the sessions that tells if the use is logged in will be destroyed
        await User.findOneAndRemove({username: req.body.username, email: req.body.email});
        req.flash("success", "Successfuly Signed Out, Bye!");
        res.redirect("/camps#popup-feedback_message");
    }catch{
        req.flash("success", "Oops Something went wrong, try again!");
        res.redirect("/camps#popup-feedback_message");
    }
}
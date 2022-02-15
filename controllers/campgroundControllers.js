"use strict";
const fetch = require("node-fetch");



module.exports.renderAllCamps = async(req, res) => {
    try{
        const response = await fetch("https://camp-shop.herokuapp.com/campgrounds/get_json");
        const data = await response.json();
        res.render("camps", {data});

    }catch {
        req.flash("error", "Oops, Something Went Wrong");
        res.status(500).redirect("/camps#popup-feedback_message");
    }
}

module.exports.search = async(req,res) => {
    if(!req.user) return res.redirect("/camps#popup-login");


    const {query} = req.body;
    try{
        const response = await fetch(`https://camp-shop.herokuapp.com/campgrounds/search/${query}`);
        const data = await response.json();
        res.status(200).render("camps", {data});

    }catch{
        req.flash("error", "Nothing Found.");
        res.status(404).redirect("/camps#popup-feedback_message");
    }
}
"use strict";
const mongoose= require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username : String,
    email: String,
    password: String
})

userSchema.plugin(passportLocalMongoose);
// this will add to the user modal some additionnal utils;
// it will add the User.register(), User.authenicate(), User.serializer(), User.deserializer(), 
// findByUsername()

module.exports  = mongoose.model("User",userSchema);


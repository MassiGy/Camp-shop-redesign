"use strict";
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}


const express = require('express');
const app = express();
const path = require('path');
const ejs_mate = require('ejs-mate');
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const flash = require("connect-flash");


const User = require("./modals/User");


const port = process.env.PORT || 3000;
const sessionName = process.env.session_name || 'u.controllers'
const sessionSecret = process.env.session_secret || 'u.controllers.token'

const sessionConfig = {
    secret: sessionSecret,
    name: sessionName,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        httpOnly: true,
        sameSite: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    }
}


async function main(){
   await mongoose.connect('mongodb://localhost:27017/camp-shop');
}
main().catch(err => console.log(err));




app.engine('ejs', ejs_mate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/css', express.static('css'))
app.use('/img', express.static('img'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




const loginRoutes = require("./routes/loginRoutes");
const logoutRoutes = require("./routes/logoutRoutes");
const signupRoutes = require("./routes/signupRoutes");
const signoutRoutes = require("./routes/signoutRoutes");
const campgroundsRoutes = require("./routes/campgroundsRoutes");
const generalRoutes = require("./routes/generalRoutes");



app.use((req, res, next) => {
    // flash messages
    res.locals.success_messages = req.flash("success");
    res.locals.error_messages = req.flash("error") ;

    // store a refrence to the current logged in user
    // in order to dynamicly build the view (link in navigation for exemple)
    res.locals.current_user = req.user;

    // to go to the next route hundler middelware
    next();
})

app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/signup", signupRoutes);
app.use("/signout", signoutRoutes);
app.use("/camps", campgroundsRoutes);
app.use("/", generalRoutes);






app.listen(port, (req, res) => {
    console.log('server started');
})

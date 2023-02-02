"use strict";

require("dotenv").config();



module.exports.renderHome = (req, res) => {
  res.render("home");
}

module.exports.renderAbout = (req, res) => {
  res.render("about");
}

module.exports.sendEmail = (req, res) => {
  const mailjet = require('node-mailjet').connect(`${process.env.mailjetAPI_KEY}`, `${process.env.mailjetAPI_SECRET}`)

  const request = mailjet
    .post("send", { 'version': 'v3.1' })
    .request({
      "Messages": [
        {
          "From": {
            "Email": "ghernaoutmassi@gmail.com",
            "Name": "Massiles GHERNAOUT"
          },
          "To": [
            {
              "Email": "ghernaoutmassi@gmail.com",
              "Name": "Massiles GHERNAOUT"
            }
          ],
          "Subject": "Camp-shop-redesign contact form",
          "HTMLPart": `<h3>Email from ${req.body.username} with the address of ${req.body.email}</h3>
      <br>
      <p>Message :
         <br> ${req.body.message} 
      </p>`,
        }
      ]
    })
  request
    .then((result) => {
      req.flash("success", "Your message was successfully sent!");
      res.redirect("/home#popup-feedback_message");
    })
    .catch((err) => {
      req.flash("error", "Oops something went wrong!");
      res.redirect("/home#popup-feedback_message");
    })
}
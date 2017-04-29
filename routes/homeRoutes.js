
const express = require('express');
const homeRoutes = express.Router();


module.exports = (knex) => {

  homeRoutes.get("/", (req, res) => {
    console.log("got get");
  });


  homeRoutes.post("/", (req, res) => {

      knex.select("*").from('users').where({
        email     : req.body.email,
        password  : req.body.password
      }).then((results) => {
        if (results.length == 0) {
          res.redirect('/')
        } else {
          res.render("test");
        }
      });

  });

  homeRoutes.get("/:id", (req, res) => {
    console.log("id got it");
    res.send("i got id");
  });

  return homeRoutes;
}


let checkEmails = (email, usersDB) => {
  let checkEmails = "";
  Object.keys(usersDB.users).forEach(function (c, i) {
      if (usersDB.users[c]['email'] == email) {
        return checkEmails = c
      }
  });
  return checkEmails;
}

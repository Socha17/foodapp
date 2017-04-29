
const express = require('express');
const homeRoutes = express.Router();


module.exports = (knex) => {

  homeRoutes.get("/", (req, res) => {
    console.log("got get");
  });


  homeRoutes.post("/", (req, res) => {
    // check is user is owner
    knex.select("*").from('owner').where({
      email     : req.body.email,
      password  : req.body.password
    }).then((results) => {
      if (results.length == 0) {
        // check if user loging in is normal user
        knex.select("*").from('users').where({
          email     : req.body.email,
          password  : req.body.password
        }).then((results) => {
          if (results.length == 0) {
            res.redirect('/')
          } else {
            let userID = req.session.user_id = req.body.email;
            console.log(userID);
            res.render("test");
          }
        });
          // user must be owner
      } else {
        let userID = req.session.user_id = req.body.email;
        console.log(userID);
        res.redirect("/admin");
      }
    });




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

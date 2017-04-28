
const express = require('express');
const homeRoutes = express.Router();


const usersDB = {
  "users": {
    "user01": {
      id: "1",
      first_name: "bob",
      last_name: "long",
      email: "user@user.com",
      password: "password"
    },
    "users02": {
      id: "2",
      first_name: "bob",
      last_name: "long",
      email: "user2@user.com",
      password: "password"
    },
  },
  "owners": {
   "owner01": {
     id: "1",
     first_name: "john",
     last_name: "short",
     email: "owner@owner.com",
     password: "password"
   }
  }
};

module.exports = (knex) => {

  homeRoutes.get("/", (req, res) => {
    console.log("got get");
  });


  homeRoutes.post("/", (req, res) => {
    console.log("clicked login");
    console.log(req.body.email);
    console.log(req.body.password);
    // var validEmail = checkEmails(req.body.email, usersDB);



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

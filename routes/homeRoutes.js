
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

module.exports = () => {

  homeRoutes.get("/", (req, res) => {
    console.log("got get");
  });

  homeRoutes.post("/", (req, res) => {
    console.log("clicked login");
    console.log(req.body.email);
    console.log(req.body.password);
    var validEmail = checkEmails(req.body.email, usersDB);
    console.log(validEmail);
    res.send("test")
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

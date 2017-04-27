
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
      email: "user@user.com",
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
    console.log(usersDB.users.user01.first_name);
  });

  return homeRoutes;
}

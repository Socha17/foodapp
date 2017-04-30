
const express = require('express');
const homeRoutes = express.Router();


module.exports = (knex, userID) => {

  homeRoutes.get("/", (req, res) => {
    console.log("got get");
    res.redirect('/')
  });


  homeRoutes.post("/", (req, res) => {

    console.log(userID);
    // check is user is owner
    knex.select("*").from('owner').where({
      email     : req.body.email,
      password  : req.body.password
    }).then((results) => {
      if (results.length == 0) {
        console.log("owner is 0");
        // check if user loging in is normal user
        knex.select("*").from('users').where({
          email     : req.body.email,
          password  : req.body.password
        }).then((results) => {
          if (results.length == 0) {
            res.redirect('/')
          } else {
            let userEmail = req.session.user_id = req.body.email;
            let userID = results[0].id
            res.redirect("test");
          }
        });
          // user must be owner
      } else {
        let userEmail = req.session.user_id = req.body.email;
        let userID = results[0].id

        res.redirect("admin");
      }
    });

  });

  return homeRoutes;
}


const express = require('express');
const adminRoutes = express.Router();


module.exports = (knex) => {

  let objOrders = {}
  let objFood = {}
  let objUsers = {}
  let gotData = false


  adminRoutes.get("/", function(req, res) {

    if (gotData == false) {
      res.render('admin')
      gotData = true;
    } else {

      knex.select("*").from('users').then((users) => {
        objUsers = users
      }).then(() => {
      knex.select("*").from('orders').then((orders) => {
        objOrders = orders
      }).then(() => {
        knex.select("*").from('foodordersusers').then((resultsFood) => {
          objFood = resultsFood
          gotData = false;
          res.json(({objFood, objOrders, objUsers}));
        })
      });
    });


    }



  });


  return adminRoutes;

}

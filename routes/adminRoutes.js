
const express = require('express');
const adminRoutes = express.Router();


module.exports = (knex) => {

  let objOrders = {}
  let objFood = {}
  let gotData = false


  adminRoutes.get("/", function(req, res) {

    if (gotData == false) {
      res.render('admin')
      gotData = true;
    } else {


    knex.select("*").from('orders').then((orders) => {
      console.log(`this is orders ${orders[0].orderTotal}`);
      objOrders = orders
    }).then(() => {
      knex.select("*").from('foodordersusers').then((resultsFood) => {
        console.log(`this is resultsFood ${resultsFood[0].name}`);
        objFood = resultsFood
        // res.redirect('/admin')
        res.json(({objFood, objOrders}));
        let testobj =  JSON.stringify({objFood, objOrders})
        // res.render('admin', {  testobj });
      })
    });

    }
    // res.json('test')


  });


  return adminRoutes;

}

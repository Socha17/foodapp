
const express = require('express');
const checkoutRoutes = express.Router();
var accountSid = 'AC3357d80625a26f42893a0de2106e7a84';
var authToken = '95078185f16cd27b11ace4da4f3b7b54';
var client = require('twilio')(accountSid, authToken);


module.exports = (knex) => {


  checkoutRoutes.get("/", (req, res) => {

    res.status(200).render("register")
  })


  checkoutRoutes.post("/", (req, res) => {
    console.log("ALLL",req.body);
    let userFirstName = req.body.first_name
    let userLastName = req.body.last_name
    let userEmail = req.body.email
    let userPassword = req.body.password
    console.log(`First Name: ${userFirstName} Last Name ${userLastName} Email ${userEmail} Password ${userPassword}`)

     knex('users').max('id')
      .then( (rows) => {
        //Get max orders id from orders table
       let setNewId = rows[0].max + 1;
       knex('users').insert({id: setNewId, first_name: userFirstName , last_name: userLastName, email: userEmail, password: userPassword })
       .then(() => {
        console.log("One user added")
        res.redirect("/checkout")
       })
      })

    //knex('users').insert({id: thisOrderId, user_id: hardCodeUserId, orderTotal: orderTotal})



  })

  return checkoutRoutes
}


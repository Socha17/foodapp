
const express = require('express');
const adminRoutes = express.Router();


module.exports = (knex , userID) => {

  const accountSid = 'ACdc7b7e947608eb3401c3b3db1aa9aca9'; // Your Account SID from www.twilio.com/console
  const authToken = '3c4ba7903c57ebe7ac077f301b4404ec';   // Your Auth Token from www.twilio.com/console

  const twilio = require('twilio');
  const client = new twilio.RestClient(accountSid, authToken);

  let objOrders = {}
  let objFood = {}
  let objUsers = {}
  let gotData = false

  adminRoutes.get("/", function(req, res) {

    console.log(`this is gotData ${gotData}`);

    if (gotData == false) {
        knex.select("*").from('users').then((users) => {
          objUsers = users
        }).then(() => {
        knex.select("*").from('orders').then((orders) => {
          objOrders = orders
        }).then(() => {
          knex.select("*").from('foodordersusers').then((resultsFood) => {
            objFood = resultsFood
            gotData = true;
            res.json(({objFood, objOrders, objUsers}));
            })
          });
        });
    } else {
      gotData = false;
      res.render('admin')
    }

  });

  adminRoutes.post("/", (req, res) => {

    client.messages.create({
        body: 'Hello from FoodApp your order is on its way',
        to: '+12896006171',  // Text this number
        from: '+12892761925' // From a valid Twilio number
    }, function(err, message) {
      if(err){
        console.log(err);
      } else {
        console.log(message.sid);
      }
    });
    res.send("message sent")
  });

  return adminRoutes;
}

//food.js
const express = require('express');
const router  = express.Router();

// function to verify if user is logged in
function verifyUserIsLoggedIn (user) {
  if (user === undefined) {
    return false;
  } else {
    return true;
  }
}

const menuDB = {
  var Pizza {
    id: 1,
    unit_price: 5,
    name: 'pizza',
    description: 'Ballin',
    image_id: '/hidden',
  }
};

module.exports = (knex) => {

  router.get("/", (req, res) => {

    res.render('foodMenu')
  });

  return router;
}

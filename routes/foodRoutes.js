//food.js
const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    console.log('boobies');
    res.render('foodMenu')
  });

  return router;
}

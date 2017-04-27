
const express = require('express');
const homeRoutes = express.Router();


module.exports = () => {

  homeRoutes.get("/", (req, res) => {
    console.log("got get");
  });

  homeRoutes.post("/", (req, res) => {
    console.log("clicked login");
    res.send("test")
  });

  console.log("got here to routes");
  return homeRoutes;
}

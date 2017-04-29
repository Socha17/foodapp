"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const homeRoutes = require("./routes/homeRoutes");


// I am testing this branch
const checkoutRoutes = require('./routes/checkoutRoutes');





const adminRoutes = require("./routes/adminRoutes");




// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Mount all resource routes


app.use("/home", homeRoutes(knex));
app.use("/api/users", usersRoutes(knex));
app.use("/admin", adminRoutes(knex));




app.use("/foods", usersRoutes(knex));
//-----RM Routes----------
app.use("/checkout", checkoutRoutes(knex));
//app.use("/checkout/:id", checkoutRoutes(knex));
// app.use("/success");
// app,use("/sucess/:id");
//-----------------------//
// Home page
app.get("/", (req, res) => {
  console.log("index");
  res.render("index");
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});

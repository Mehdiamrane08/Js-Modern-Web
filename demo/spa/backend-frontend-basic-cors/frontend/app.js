var createError = require("http-errors");
var express = require("express");
var path = require("path");
//var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
// not found in static files, so default to index.html
app.use((req, res, next) => {  
  return res.sendFile(`${__dirname}/public/index.html`);
  next();
});

module.exports = app;

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var usersRouter = require("./routes/users");
var filmRouter = require("./routes/films");
let { authorize } = require("./utils/auth");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// not found in static files, so default to index.html
app.use((req, res,next) => {  
  if (!req.path.startsWith("/api/"))
    return res.sendFile(`${__dirname}/public/index.html`);  
  next();
});


app.use("/api/users", usersRouter);
// all the routes given in the filmRouter shall be secure : call the authorize middleware
app.use("/api/films", authorize, filmRouter);


module.exports = app;

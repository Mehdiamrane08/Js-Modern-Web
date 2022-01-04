var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
//var session = require("express-session");

//var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

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

/*
// use the express-session middleware
// NB : the middleware shall be prior to the router
app.use(
  session({
    secret: "689HiHoveryDi79*",
    //resave: false,
    //saveUninitialized: true,
  })
);

// initialize the session data
app.use(function (req, res, next) {
  console.log("app.use:: check if the session data shall be initialized");

  if (!req.session.isAuthenticated) {
    console.log("app.use:: !req.session.isAuthenticated");
    req.session.isAuthenticated = false;
  }

  if (!req.session.user) {
    req.session.user = "";
  }

  console.log(
    "app.use()::req.sessionID : ",
    req.sessionID,
    " ",
    req.session.id
  );

  next();
});*/

//app.use("/", indexRouter);
app.use("/api/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

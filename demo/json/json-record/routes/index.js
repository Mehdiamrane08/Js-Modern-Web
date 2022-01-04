var express = require("express");
var router = express.Router();
let User = require("../model/User.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(
    "GET / user: ",
    req.session.user,
    "Auth: ",
    req.session.isAuthenticated
  );
  res.render("index", {
    headerTitle: "JavaScript & Node.js full course",
    pageTitle: "Demo : MPA with Express",
    footerText: "Happy learning : )",
    user: req.session.user,
    isAuthenticated: req.session.isAuthenticated,
    message:"Welcome to this amazing site which allows users to register with an email and a password.",
  });
});

/* GET user register form*/
router.get("/register", function (req, res, next) {
  if (!req.session.isAuthenticated) {
    res.render("user-form", {
      headerTitle: "JavaScript & Node.js full course",
      pageTitle: "Demo : MPA with Express : Register Form",
      footerText: "Happy learning : )",
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
    });
  }
});

/* POST new user */
router.post("/register", function (req, res, next) {  
  if(User.isUser(req.body.email)){   
    return res.render("user-form", {
      headerTitle: "JavaScript & Node.js full course",
      pageTitle:
        "Demo : MPA with Express : User / email already exists. Please retry",
      footerText: "Happy learning : )",
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
      isLogin: false,
    });
  }
  let newUser = new User(req.body.email,req.body.email,req.body.password);
  newUser.save();
  console.log("POST /register:", User.list);
  // manage session data
  req.session.isAuthenticated = true;
  req.session.user = req.body.email;
  res.redirect("/list");
});

/* GET user list*/
router.get("/list", function (req, res, next) {
  //console.log("GET /list:", req.app.locals.userList);
  console.log("GET /register:", User.list);
  //let mapToObject = Object.fromEntries(req.app.locals.userList); // if we wanted to use a map, we would have to convert it to an object as Pug does not support yet Maps
  //console.log("GET /list:", mapToObject);
  if (req.session.isAuthenticated) {
    res.render("user-list", {
      headerTitle: "JavaScript & Node.js full course",
      pageTitle: "Demo : MPA with Express : User List",
      footerText: "Happy learning : )",
      userList: User.list,//req.app.locals.userList, //mapToObject, // if we were to use a Map 
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
    });
  } 
  else {
    res.render("index", {
      headerTitle: "JavaScript & Node.js full course",
      pageTitle: "Demo : MPA with Express",
      footerText: "Happy learning : )",
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
      message:"You are not authorized to see this ressource. Please login first, or register if you don't have an account.",
    });

  }
});

/* GET user login form*/
router.get("/login", function (req, res, next) {
  if (!req.session.isAuthenticated) {
    res.render("user-form", {
      headerTitle: "JavaScript & Node.js full course",
      pageTitle: "Demo : MPA with Express : Login Form",
      footerText: "Happy learning : )",
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
      isLogin: true,
    });
  }
});

/* POST user credentials to login*/
router.post("/login", function (req, res, next) { 
  let user = new User(req.body.email,req.body.email,req.body.password);
  console.log("POST /login:", User.list);
  if(user.checkCredentials(req.body.email,req.body.password)){ 
    // manage session data
    req.session.isAuthenticated = true;
    req.session.user = req.body.email;
    return res.redirect("/list");
  } else {
    res.render("user-form", {
      headerTitle: "JavaScript & Node.js full course",
      pageTitle:
        "Demo : MPA with Express : ERROR in email or password. Please retry.",
      footerText: "Happy learning : )",
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
      isLogin: true,
    });
  }
});

/* GET logout */
router.get("/logout", function (req, res, next) {
  if (req.session.isAuthenticated) {
    req.session.destroy(function (err) {
      // cannot access session here
      if (err) return console.error("Error in session destroy:", err);
      return res.redirect("/login");
    });
  }
});

module.exports = router;

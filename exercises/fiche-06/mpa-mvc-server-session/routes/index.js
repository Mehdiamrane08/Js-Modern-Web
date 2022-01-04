var express = require("express");
var router = express.Router();

let User = require("../models/User.js");

const FOOTER_TEXT = "Happy exercising :)";
const HEADER_TITLE = "Node.js MPA Express";

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    headerTitle: HEADER_TITLE,
    pageTitle: "Home",
    footerText: FOOTER_TEXT,
    user: req.session.user,
    isAuthenticated: req.session.isAuthenticated,
    message:
      "Welcome to this amazing site which allows users to register with an email and a password, and manage films.",
  });
});

/* GET home page. */
router.get("/", function (req, res, next) {

  res.render("index", {
    headerTitle: HEADER_TITLE,
    pageTitle: "Demo : MPA with Express & MVC",
    footerText: FOOTER_TEXT,
    user: req.session.user,
    isAuthenticated: req.session.isAuthenticated,    
  });
});

/* GET user register form*/
router.get("/register", function (req, res, next) {
  if (!req.session.isAuthenticated) {
    res.render("user-form", {
      headerTitle: HEADER_TITLE,
      pageTitle: "Demo : MPA with Express & MVC : Register Form",
      footerText: FOOTER_TEXT,
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
    });
  }
});

/* POST new user */
router.post("/register", function (req, res, next) {  
  if(User.isUser(req.body.email)){   
    return res.render("user-form", {
      headerTitle: HEADER_TITLE,
      pageTitle:
        "Demo : MPA with Express & MVC : User / email already exists. Please retry",
      footerText: FOOTER_TEXT,
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
      isLogin: false,
    });
  }
  let newUser = new User(req.body.email,req.body.email,req.body.password);
  newUser.save();
  // manage session data
  req.session.isAuthenticated = true;
  req.session.user = req.body.email;
  res.redirect("/films");
});

/* GET user login form*/
router.get("/login", function (req, res, next) {
  if (!req.session.isAuthenticated) {
    res.render("user-form", {
      headerTitle: HEADER_TITLE,
      pageTitle: "Demo : MPA with Express & MVC : Login Form",
      footerText: FOOTER_TEXT,
      user: req.session.user,
      isAuthenticated: req.session.isAuthenticated,
      isLogin: true,
    });
  }
});

/* POST user credentials to login*/
router.post("/login", function (req, res, next) {   
  let user = new User(req.body.email,req.body.email,req.body.password);
  if(user.checkCredentials(req.body.email,req.body.password)){
    // manage session data
    req.session.isAuthenticated = true;
    req.session.user = req.body.email;
    return res.redirect("/films");
  } else {
    res.render("user-form", {
      headerTitle: HEADER_TITLE,
      pageTitle:
        "Demo : MPA with Express & MVC : ERROR in email or password. Please retry.",
      footerText: FOOTER_TEXT,
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

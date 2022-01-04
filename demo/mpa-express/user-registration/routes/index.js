var express = require("express");
var router = express.Router();



/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    headerTitle: "JavaScript & Node.js full course",
    pageTitle: "Demo : MPA with Express",
    footerText: "Happy learning : )",
  });
});

/* GET user register form*/
router.get("/register", function (req, res, next) {
  res.render("user-form", {
    headerTitle: "JavaScript & Node.js full course",
    pageTitle: "Demo : MPA with Express : Register Form",
    footerText: "Happy learning : )",
  });
});

/* POST new user */
router.post("/register", function (req, res, next) {  
  req.app.locals.userList.push({email:req.body.email,password:req.body.password});
  console.log("POST /register:",req.app.locals.userList)  ;
  res.redirect("/list");
});

/* GET user list*/
router.get("/list", function (req, res, next) {
  console.log("GET /list:",req.app.locals.userList)  ;
  res.render("user-list", {
    headerTitle: "JavaScript & Node.js full course",
    pageTitle: "Demo : MPA with Express : User List",
    footerText: "Happy learning : )",
    userList:req.app.locals.userList,
  });
});



module.exports = router;

var express = require("express");
var router = express.Router();

let Film = require("../models/Film.js");

const FOOTER_TEXT = "Happy exercising :)";
const HEADER_TITLE = "Node.js MPA Express";

/* GET add film form*/
router.get("/add", function (req, res, next) {
  res.render("film-form", {
    headerTitle: HEADER_TITLE,
    pageTitle: "Add Film Form",
    footerText: FOOTER_TEXT,
    user: req.session.user,
    isAuthenticated: req.session.isAuthenticated,  
  });
});

/* POST new film */
router.post("/", function (req, res, next) {
  let film = new Film(req.body.title, req.body.duration, req.body.budget, req.body.link);
  film.save();  
  res.redirect("/films");
});

/* GET film list*/
router.get("/", function (req, res, next) {
  res.render("film-list", {
    headerTitle: HEADER_TITLE,
    pageTitle: "My Film List",
    footerText: FOOTER_TEXT,
    filmList: Film.list,
    user: req.session.user,
    isAuthenticated: req.session.isAuthenticated,  
  });
});

module.exports = router;

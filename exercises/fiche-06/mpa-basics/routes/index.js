var express = require("express");
var router = express.Router();
const FOOTER_TEXT = "Happy exercising :)";
const HEADER_TITLE = "Node.js MPA Express";
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    headerTitle: HEADER_TITLE,
    pageTitle: "Home",
    footerText: FOOTER_TEXT,
  });
});

/* GET add film form*/
router.get("/films/add", function (req, res, next) {
  res.render("film-form", {
    headerTitle: HEADER_TITLE,
    pageTitle: "Add Film Form",
    footerText: FOOTER_TEXT,
  });
});

/* POST new film */
router.post("/films", function (req, res, next) {
  // add protocole if needed to the link
  let link = req.body.link;
  if (!link.match(/^(http|https)/)) link = "http://" + link;

  req.app.locals.filmList.push({
    title: req.body.title,
    duration: req.body.duration,
    budget: req.body.budget,
    link: link,
  });
  res.redirect("/films");
});

/* GET film list*/
router.get("/films", function (req, res, next) {
  res.render("film-list", {
    headerTitle: HEADER_TITLE,
    pageTitle: "My Film List",
    footerText: FOOTER_TEXT,
    filmList: req.app.locals.filmList,
  });
});

module.exports = router;

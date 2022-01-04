var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:userId/books/:bookId", function (req, res) {
  res.send(`Parameters in path: userID: ${req.params.userId}
  bookId:${req.params.bookId}`);
});

module.exports = router;

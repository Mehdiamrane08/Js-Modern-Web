/**
 * import (require()) / export modules (module.exports or exports) : Some extra codes to understand how to manage module.exports or exports within modules
 * CommonJS import / export (server side)
 * Equivalent of a default import, we can give any variable name
 *  */
const menu = require("../data/pizza.js");

var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
/*const menu = [
  {
    id: 1,
    title: "4 fromages",
    content: "Gruyère, Sérac, Appenzel, Gorgonzola, Tomates",
  },
  {
    id: 2,
    title: "Vegan",
    content: "Tomates, Courgettes, Oignons, Aubergines, Poivrons",
  },
  {
    id: 3,
    title: "Vegetarian",
    content: "Mozarella, Tomates, Oignons, Poivrons, Champignons, Olives",
  },
  {
    id: 4,
    title: "Alpage",
    content: "Gruyère, Mozarella, Lardons, Tomates",
  },
  {
    id: 5,
    title: "Diable",
    content: "Tomates, Mozarella, Chorizo piquant, Jalapenos",
  },
];*/
const jwtSecret = "ilovemypizza!";
/* GET /pizzas : list all the pizzas from the MENU */
router.get("/", function (req, res, next) {
  res.json(menu);
});

/* POST /pizzas : create a pizza to be added to the menu 
Return the new pizza
This ressource operation shall be authorized only to pizzaadmin and protected via a JWT !*/
router.post("/", function (req, res, next) {
  /* To authorize the access: 
  Get token from authorization header */
  let token = req.get("authorization");

  // Step3 : improvement by using JWT
  if (!token) return res.status(401).send("You are not authenticated.");

  jwt.verify(token, jwtSecret, (err, token) => {
    if (err) return res.status(401).send(err.message);
    if (token.username !== "pizzaadmin")
      return res.status(403).send("You are not authorized.");
    const newPizza = {
      id: menu.length + 1,
      title: req.body.title,
      content: req.body.content,
    };
    menu.push(newPizza);
    return res.json(newPizza);
  });
});

module.exports = router;

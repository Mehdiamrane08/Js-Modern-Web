var express = require("express");
var router = express.Router();
const menu = [
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
];
/* GET /pizzas : list all the pizzas from the MENU */
router.get("/", function (req, res, next) {
  res.json(menu);
});

/* POST /pizzas : create a pizza to be added to the menu 
Return the new pizza*/
router.post("/", function (req, res, next) {
  console.log("My POST /pizzas");
  const newPizza = {
    id: menu.length + 1,
    title: req.body.title,
    content: req.body.content,
  };
  menu.push(newPizza);
  return res.json(newPizza);
});

module.exports = router;

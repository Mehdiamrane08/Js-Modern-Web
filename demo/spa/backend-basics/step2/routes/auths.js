var express = require("express");
var router = express.Router();

const users = [
  { username: "pizzaadmin", password: "Pizzaadmin" },
  { username: "guest", password: "Guest" },
];

/* Register a user : POST /auths/register */
router.post("/register", function (req, res, next) {
  const newUser = {
    username: req.body.username,
    password: req.body.password,
  };
  users.push(newUser);
  const authenticatedUser = {
    username: req.body.username,
    token: "Future signed token",
  };

  return res.json(authenticatedUser);
});

/* login a user : POST /auths/login */
router.post("/login", function (req, res, next) {
  // check if username exists in user
  const userFound = users.find((user) => user.username === req.body.username);
  if (!userFound) return res.status(401).send("You are not authenticated.");
  if (userFound.password !== req.body.password)
    return res.status(401).send("You are not authenticated.");

  const authenticatedUser = {
    username: req.body.username,
    token: "Future signed token",
  };

  return res.json(authenticatedUser);
});

/* GET /auths/users/unsafe : list all the users that can be authenticated 
WARNING this is a security hole !!! You shall authorize access to these ressources*/
router.get("/users/unsafe", function (req, res, next) {
  return res.json(users);
});

/* GET /auths/users : list all the users that can be authenticated 
You shall authorize access to these ressources
This not safe, but to understand, we start to allow any authenticated user*/
router.get("/users", function (req, res, next) {
  /* To authorize the access, we could do something like : 
  Get token from authorization header */
  let token = req.get("authorization");
  if (token !== "Future signed token")
    return res.status(401).send("Not authorize to access this ressource");
  return res.json(users);
});

module.exports = router;

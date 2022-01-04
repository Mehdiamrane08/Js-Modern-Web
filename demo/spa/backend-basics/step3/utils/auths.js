/**
 * import (require()) / export modules (module.exports or exports) : Some extra codes to understand how to manage module.exports or exports within modules
 * CommonJS import / export (server side)
 *  */

const jwt = require("jsonwebtoken");

const jwtSecret = "ilovemypizza!";

// the intial list of potential authenticated users
const users = [
  { username: "pizzaadmin", password: "Pizzaadmin" },
  { username: "guest", password: "Guest" },
];

// Shorter version of an export : the intial list of potential authenticated users
/*exports.userscopy = [
  { username: "pizzaadmin", password: "Pizzaadmin" },
  { username: "guest", password: "Guest" },
];*/

/**
 * Authorize middleware to be used on the routes to be secured/
 * This middleware authorize only user that have a valid JWT
 * and which are still present in the list of potential authenticated users
 */

const authorize = (req, res, next) => {
//module.exports.authorize = (req, res, next) => {
  /* To authorize the access: 
  Get token from authorization header */
  let token = req.get("authorization");

  // Step3 : improvement by using JWT
  if (!token) return res.status(401).send("You are not authenticated.");

  jwt.verify(token, jwtSecret, (err, token) => {
    if (err) return res.status(401).send(err.message);
    // check if token.username exists in users
    const userFound = users.find((user) => user.username === token.username);
    if (!userFound) return res.status(403).send("You are not authorized.");
    next(); // call the next Middleware => see /routes/auths.js GET /auths/users
  });
};

module.exports = { authorize, users };
// exports = { authorize, users };
//module.exports.users = users;
//module.exports.authorize = authorize;

console.log(module.exports);


/**
 * module.exports : object reference returned by the required() call
 * module.exports {authorize, users }; IS equivalent of
 * 1) Exporting "a la volee", preferred version
 * module.exports.authorize = authorize;
 * module.exports.users = users ;
 * 2) Exporting "a la volee", using shorter version
 * exports is a reference to module.exports , exports is not returned by the required() call
 * exports.authorize = authorize
 * exports.users = users;
 * 3) Bad use of Exports
 * exports = { authorize, users }; // exports has a new reference, it is no longer linked to module.exports
 */

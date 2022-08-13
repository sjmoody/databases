var routerStatic = require('express').Router();

//Connect controller methods to their corresponding routes
routerStatic.get('/', function (req, res) {
  res.send("Look for /chat/messages or /chat/users endpoint");
});

module.exports = routerStatic;


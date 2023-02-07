const AuthController = require("../controller/auth");

const route = require("express").Router();

route.get("/", AuthController.getMeController);

module.exports = route
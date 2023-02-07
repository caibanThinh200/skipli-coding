const UserController = require("../controller/users");

const route = require("express").Router();

route.get("/", UserController.searchGithubUsers);
route.get("/:id", UserController.findGithubUserProfile);

module.exports = route;
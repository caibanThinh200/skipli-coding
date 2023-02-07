const ReactionController = require("../controller/reaction");

const route = require("express").Router();

route.post("/like", ReactionController.likeGithubUser);

module.exports = route;
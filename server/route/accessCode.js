const route = require("express").Router();
const AccessCodeController = require("../controller/accessCode");

route.post("/create-access", AccessCodeController.createAccessCode);
route.post("/validate-access", AccessCodeController.validateAccessCode);

module.exports = route;
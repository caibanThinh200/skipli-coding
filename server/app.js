const express = require("express");
const app = express();
const body_parser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const { setHeaders } = require("./middleware/header");
const accessRoute = require("./route/accessCode");
const userRoute = require("./route/users");
const reactionRoute = require("./route/reaction");
const authRoute = require("./route/auth");

app.use(body_parser.urlencoded({ extended: false }))

// parse application/json
app.use(body_parser.json())
//cors
app.use(cors());
app.use(setHeaders)

app.use("/access-code", accessRoute);
app.use("/users", userRoute);
app.use("/react", reactionRoute);
app.use("/auth", authRoute);

app.get("/", (req, res, next) => {
    res.send('<h1>Welcome to NodeJS</h1>');
})

app.get("*", (req, res, next) => {
    res.send('Api not found');
})

module.exports = app;
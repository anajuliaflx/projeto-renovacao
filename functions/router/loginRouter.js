// server/routes/authRoutes.js
const express = require("express");
const loginController = require("../controller/loginController");

const loginRouter = express.Router();

loginRouter.post("/login", loginController.login);
loginRouter.post("/logout", loginController.logout);

module.exports = loginRouter;

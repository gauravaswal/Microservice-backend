const express = require('express')
const authController = require("./auth.controller")
const authrouter = express.Router()

authrouter.post("/register", authController.register);
authrouter.post("/login", authController.login);

module.exports = authrouter

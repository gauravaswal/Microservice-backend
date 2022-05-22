var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');
const mongoConnection = require('./config/db')
mongoConnection
const LoginToken = require("./config/model/logintoken")
const axios = require('axios')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post("/generate-token", async (req, res) => {
  try {
    let token = jwt.sign({
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: {
        email: req.body.email,
        userid: req.body.userid
      }
    }, 'secret');
    let logintoken = await LoginToken.create({
      token: token,
      userId: req.body.userid,
      email: req.body.email
    })
    if (logintoken) {
      return res.send({
        code: 200,
        data: logintoken,
        message: "Token generated"
      })
    } else {
      return res.send({
        code: 500,
        data: {},
        message: "Something went wrong"
      })
    }
  } catch (err) {
    return res.send({
      code: 500,
      data: {},
      message: "Something went wrong"
    })
  }
})

module.exports = app;

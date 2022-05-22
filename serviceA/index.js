const express = require('express')
const app = express()
const mongoConnection = require('./config/db')
const axios = require('axios');
var bodyParser = require('body-parser')
const authRouter = require("./src/auth/auth.route")
var cors = require('cors')

require('dotenv').config()
const port = 3000
mongoConnection
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
// parse application/json
app.use(bodyParser.json())
app.use("/v1",authRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
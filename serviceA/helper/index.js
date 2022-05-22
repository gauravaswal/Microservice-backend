const bcrypt = require('bcrypt');
const saltRounds = 10;
const axios = require('axios')

exports.encrypPassword = async (plainPassword) => {
    const encrytpassword = await bcrypt.hash(plainPassword, saltRounds)
    return encrytpassword
}
exports.comparePassword = async (plainPassword, hashpassword) => {
    let compare = await bcrypt.compare(plainPassword, hashpassword)
    return compare
}
exports.responseObject = (req, res, success, code = 200, message, data) => {
    return res.status(code).send({
        success: success,
        code: code,
        message: message,
        data: data
    })
}
exports.errorsobject = (req, res, success = false, code = 200, message) => {
    return res.send({
        success: success,
        code: code,
        message: message,
    }).status(code)
}
exports.messages = {
    "REGISTER_SUCCESS": "Registeration successfully",
    "LOGIN_SUCCESS": "Login successfully",
    "SOMETHING_WENT_WRONG": "Oops Something went wrong.Please try again",
    "PASSWORD_WRONG": "Incorrect password",
    "EMAIL_WRONG": "Incorrect email"

}
exports.externalApis = {
    "LoginToken": "http://localhost:3001/generate-token",
}
exports.axiosObject = async (req, res, url, data, method) => {
    return await axios[method](url, data)
}
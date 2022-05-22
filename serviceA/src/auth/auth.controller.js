const User = require("../../model/user")
const { messages, encrypPassword, comparePassword, responseObject, externalApis, axiosObject } = require("../../helper/index")
const axios = require('axios')

exports.register = async (req, res) => {
    const password = await encrypPassword(req.body.password)
    req.body.password = password
    let user = await User.create(req.body)
    if (user) {
        return res.send({
            data: user,
            message: messages.REGISTER_SUCCESS,
            code: 201
        })
    }
}
exports.login = async (req, res) => {
    try {

        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const passwordCompare = await comparePassword(req.body.password, user.password)
            if (passwordCompare) {
                const values = {
                    email: user.email,
                    userid: user._id
                }
                const generatedToken = await axiosObject(req, res, externalApis.LoginToken, values, 'post')
                delete user.password
                if (generatedToken.data?.code == 200) {
                    return responseObject(req, res, true, 200, messages.LOGIN_SUCCESS, { user: user, token: generatedToken.data?.data?.token })
                } else {
                    return responseObject(req, res, false, 500, messages.SOMETHING_WENT_WRONG, {})
                }
            } else {
                return responseObject(req, res, false, 400, messages.PASSWORD_WRONG, {})
            }
        } else {
            return responseObject(req, res, false, 400, messages.EMAIL_WRONG, {})
        }
    } catch (err) {
        console.log("---er", err)
        return res.send({
            data: {},
            message: messages.SOMETHING_WENT_WRONG,
            code: 500
        })
    }

}
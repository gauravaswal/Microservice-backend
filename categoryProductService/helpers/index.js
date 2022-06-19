const saltRounds = 10;
// const axios = require('axios')

exports.encrypPassword = async (plainPassword) => {
    const encrytpassword = await bcrypt.hash(plainPassword, saltRounds)
    return encrytpassword
}
exports.comparePassword = async (plainPassword, hashpassword) => {
    let compare = await bcrypt.compare(plainPassword, hashpassword)
    return compare
}
exports.responseObject = (req = "", res, success, code = 200, message, data) => {
    return res.response({
        success: success,
        code: code,
        message: message,
        data: data
    }).code(code);

}
exports.orderObject = {
    "limit": 10,
    "page":1,
    "orderby": "createdAt"

}
exports.responsewithPaginationObject = (req = "", res, totalRecord, page, success, code = 200, message, data) => {
    return res.response({
        success: success,
        totalRecord: totalRecord,
        page: page,
        code: code,
        message: message,
        data: data
    }).code(code)
}
exports.errorsobject = (res, success = false, code = 500, message) => {
    return res.response({
        success: success,
        code: code,
        message: message,
    }).code(code)
}
exports.messages = {
    "CATEGORY_CREATED": "Category created successfully",
    "CATEGORY_NAME_EXIST": "Category Name already exist",

    "CATEGORY_GET": "Category get successfully",
    "SOMETHING_WENT_WRONG": "Oops Something went wrong.Please try again",
    "CATEGORY_DELETED": "Category deleted successfully",
    "PRODUCT_ADDED": "Product created successfully",
    "PRODUCT_NAME_EXIST": "Product name already exist",

    "PRODUCT_GET": "Product get successfully",
    "PRODUCT_DELETED": "Product deleted successfully",
    "PRODUCT_LIST": "Product listing get successfully"
}
exports.externalApis = {
    "LoginToken": "http://localhost:3001/generate-token",
}
// exports.axiosObject = async (req, res, url, data, method) => {
//     return await axios[method](url, data)
// }
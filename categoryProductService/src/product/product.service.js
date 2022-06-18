const ProductModel = require("../../models/index").Product
const { messages, errorsobject } = require("../../helpers/index")
exports.ProductCreate = async (data, h) => {
    try {
        const result = await ProductModel.create(data)
        if (result) {
            return {
                code: 201,
                success: true,
                data: result
            }
        } else {
            return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
        }
    } catch (err) {
        return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
    }
}
/* this function take two arguments first is query and 2nd is res*/
exports.ProductFindOne = async (data, h) => {
    const result = await ProductModel.findOne(data)
    return {
        code: 200,
        success: true,
        data: result
    }
}
const ProductModel = require("../../models/index").Product
const ProductImageModel = require("../../models/index").ProductImage

const { messages, errorsobject } = require("../../helpers/index")
exports.ProductCreate = async (data, h) => {
    try {
        const result = await ProductModel.create(data)
        if (result) {
            let productImage = data.image.filter(item => {
                return iutem.productId = result.id
            })
            await ProductImageModel.bulkcreate(productImage)
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
exports.ProductFindAll = async (data, h) => {
    try {
        const result = await ProductModel.findAll(data)
        return {
            code: 200,
            success: true,
            data: result
        }
    } catch (err) {
        return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
    }
}
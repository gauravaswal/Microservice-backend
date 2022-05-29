
const productService = require("./product.service")
const { messages, responseObject, errorsobject, orderObject, responsewithPaginationObject } = require("../../helpers/index")

exports.creates = async (request, h) => {
    try {
        const payload = {
            where: {
                name: request.payload.name.trim()
            }
        }
        const checktNameExist = await productService.ProductFindOne(payload, h)
        if (checktNameExist?.data) {
            return responseObject(request, h, false, 400, messages.CATEGORY_NAME_EXIST, {})
        }
        const result = await productService.ProductCreate(request.payload, h)
        if (result?.code == 201) {
            return responseObject(request, h, true, result.code, messages.CATEGORY_CREATED, result.data)

        } else {
            return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
        }
    } catch (err) {
        console.log("--controller", err)
        return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
    }
}
exports.list = async (request, h) => {
    try {
        const { page, limit } = request.query
        const pagelimit = parseInt(limit) ? parseInt(limit) : orderObject.limit
        const offset = ((parseInt(page) - 1) * pagelimit)
        const payload = {
            where: {
                isdeleted: false
            },
            limit: pagelimit,
            offset: offset
        }
        const result = await categoryService.CategoryFindAll(payload, h)
        if (result?.code == 200) {
            return responsewithPaginationObject(request, h, result?.totalRecord, page, true, result.code, messages.CATEGORY_GET, result.data)
        } else {
            return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
        }
    } catch (err) {
        console.log("--controller", err)
        return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
    }
}
const category = require("../../models/index").Category
const { messages, errorsobject } = require("../../helpers/index")
exports.CategoryCreate = async (data, h) => {
    try {
        const Category = await category.create(data)
        if (Category) {
            return {
                code: 201,
                success: true,
                data: Category
            }
        } else {
            return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
        }
    } catch (err) {
        console.log("--service-catch", err)
        return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
    }
}
exports.CategoryFindOne = async (data, h) => {
    try {
        const Category = await category.findOne(data)
        return {
            code: 200,
            success: true,
            data: Category
        }
    } catch (err) {
        console.log("--service-findOne", err)
        return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
    }
},
    exports.CategoryFindAll = async (data, h) => {
        try {
            const Category = await category.findAndCountAll(data)
            return {
                code: 200,
                success: true,
                data: Category.rows,
                totalRecord: Category.count
            }
        } catch (err) {
            console.log("--service-findAll", err)
            return errorsobject(h, false, 500, messages.SOMETHING_WENT_WRONG)
        }
    }
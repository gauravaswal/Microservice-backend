
const productService = require("./product.service")
const { messages, responseObject, errorsobject, orderObject, responsewithPaginationObject } = require("../../helpers/index")
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const multer = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, '/uploads/')
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//       cb(null, file.fieldname + '-' + uniqueSuffix)
//     }
//   })
  
//   const upload = multer({ storage: storage })


exports.creates = async (request, h) => {
    try {
        const payload = {
            where: {
                name: request.payload.name.trim()
            }
        }
        const checktProductNameExist = await productService.ProductFindOne(payload, h)
                
        if (checktProductNameExist?.data) {
            return responseObject(request, h, false, 400, messages.PRODUCT_NAME_EXIST, {})
        }
        const result = await productService.ProductCreate(request.payload, h)
        if (result?.code == 201) {
            return responseObject(request, h, true, result.code, messages.PRODUCT_ADDED, result.data)

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
        let payload = {}
        if (request.payload.type == "category") {
            payload = {
                where: {
                    name: { [Op.like]: `%${request.query.search}%` }
                },
                // include: {
                //     model:
                //   }
            }
        } else {

        }
        // const payload = {
        //     where: {
        //         isdeleted: false
        //     },
        //     limit: pagelimit,
        //     offset: offset
        // }
        const result = await productService.ProductFindAll(payload, h)
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
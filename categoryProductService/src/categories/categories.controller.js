
const categoryService = require("./category.service")
const dummy = require("../../models/index").Dummy
const { messages, responseObject, errorsobject, orderObject, responsewithPaginationObject } = require("../../helpers/index")
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


exports.creates = async (request, h) => {
    try {
        const payload = {
            where: {
                name: request.payload.name.trim()
            }
        }
        const checktNameExist = await categoryService.CategoryFindOne(payload, h)
        if (checktNameExist?.data) {
            return responseObject(request, h, false, 400, messages.CATEGORY_NAME_EXIST, {})
        }
        const result = await categoryService.CategoryCreate(request.payload, h)
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
        const pageno = page ? page : orderObject.page
        const pagelimit = parseInt(limit) ? parseInt(limit) : orderObject.limit
        const offset = ((parseInt(pageno) - 1) * pagelimit)
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
exports.csv = async (request, h) => {
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var data = {}
    data.table = []

    for (let i = 0; i < 10000; i++) {
        console.log("---logs", possible.charAt(Math.floor(Math.random() * possible.length)))
        await dummy.create({
            name: possible.charAt(Math.floor(Math.random() * possible.length))
        })
    }
    return responsewithPaginationObject(request, h, "done", 1, true, 200, messages.CATEGORY_GET, "test")
    // let jsonObj = JSON.stringify(data);
    // fs.writeFile('output.json', jsonObj, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    //     return {
    //         message: "completed"
    //     }
    // });
    // fs.writeFile("output.json", jsonObj, 'utf8', function (err) {
    //     if (err) {
    //         console.log("An error occured while writing JSON Object to File.");
    //         return console.log(err);
    //     }

    //     console.log("JSON file has been saved.");
    // });





















    // var jsonData = '{"persons":[{"name":"John","city":"New York"},{"name":"Phil","city":"Ohio"}]}';

    // // parse json
    // var jsonObj = JSON.parse(jsonData);
    // // console.log(jsonObj);

    // // stringify JSON Object
    // var jsonContent = JSON.stringify(jsonObj);
    // // console.log(jsonContent);

    // fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
    //     if (err) {
    //         console.log("An error occured while writing JSON Object to File.");
    //         return console.log(err);
    //     }

    //     console.log("JSON file has been saved.");
    // });

},
    exports.getList = async (request, h) => {
        let querySearch = {}
        if (request.query.search) {
            querySearch = {
                where: {
                    name: { [Op.like]: `%${request.query.search}%` },
                }
            }
        }
        const dummresult = await dummy.findAll(querySearch)
        return responsewithPaginationObject(request, h, dummresult.length, 1, true, 200, messages.CATEGORY_GET, dummresult)
    }
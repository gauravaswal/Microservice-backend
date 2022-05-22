const Hapi = require('@hapi/hapi');
const categorController  = require("./categories.controller")
//  import  categorController from "./categories.controller"
const userRoutes = [
    {
        method: 'GET',
        path: '/',
        handler: categorController.user
        // (request, h) => {

        //     return 'Hello World!';
        // }
    }
]

module.exports = userRoutes
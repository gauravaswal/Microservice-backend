const Hapi = require('@hapi/hapi');
const categorController  = require("./categories.controller")
//  import  categorController from "./categories.controller"
const userRoutes = [
    {
        method: 'POST',
        path: '/category/create',
        handler: categorController.creates
        
    },
    {
        method: 'GET',
        path: '/category/list',
        handler: categorController.list
    }
]

module.exports = userRoutes
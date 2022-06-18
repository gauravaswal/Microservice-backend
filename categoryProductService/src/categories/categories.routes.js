const Hapi = require('@hapi/hapi');
const categorController  = require("./categories.controller")
//  import  categorController from "./categories.controller"
const categoryRoutes = [
    {
        method: 'POST',
        path: '/category/create',
        handler: categorController.creates
        
    },
    {
        method: 'GET',
        path: '/category/list',
        handler: categorController.list
    },
    {
        method: 'GET',
        path: '/category/csv',
        handler: categorController.csv
    },
    {
        method: 'GET',
        path: '/category/dummy',
        handler: categorController.getList
    }
]

module.exports = categoryRoutes
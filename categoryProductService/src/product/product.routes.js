const Hapi = require('@hapi/hapi');
const productController = require("./product.controller")
const userRoutes = [
    {
        method: 'POST',
        path: '/product/create',
        handler: productController.creates

    },
]

module.exports = userRoutes
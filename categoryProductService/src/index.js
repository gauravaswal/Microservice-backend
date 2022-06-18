const Hapi = require('@hapi/hapi');
const productRoutes = require("./product/product.routes")
const categoryRoutes = require("./categories/categories.routes")

const indexRoutes = [
   ...categoryRoutes,
   ...productRoutes
]

module.exports = indexRoutes
const Hapi = require('@hapi/hapi');
const productController = require("./product.controller")
const fs = require('fs')
const handleFileUpload = file => {
    return new Promise((resolve, reject) => {
        const filename = file.hapi.filename
        const imageData = file.hapi.filename.split(".")
        const imageName = `${Date.now()}.${imageData[1]}`
        const data = file._data
        fs.writeFile('./upload/' + imageName, data, err => {
            if (err) {
                reject(err)
            }
            resolve({ message: 'Upload successfully!', data: `/upload/` + imageName })
        })
    })
}
const productRoutes = [
    {
        method: 'POST',
        path: '/product/create',
        handler: productController.creates

    },
    {
        path: '/product/upload',
        method: 'POST',
        options: {
            payload: {
                output: 'stream',
                maxBytes: 209715200,
                multipart: {
                    output: 'stream'
                },
                output: 'file',
                parse: true
            }
        },
        handler: (req, h) => {
            const { payload } = req
            const response = handleFileUpload(payload.file)
            return response
        },
    },
]

module.exports = productRoutes
'use strict';

const Hapi = require('@hapi/hapi');
const Sequelize = require('./models/index')
const CategoryRoutes = require('./src/categories/categories.routes')
const indexRoutes = require('./src/index')
const Inert = require('inert')

const init = async () => {
    const server = Hapi.server({
        port: 3005,
        host: 'localhost'
    });
    await server.register(Inert)
    server.route(indexRoutes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
'use strict';

const Hapi = require('@hapi/hapi');
const Sequelize = require('./models/index')
const CategoryRoutes = require('./src/categories/categories.routes')

const init = async () => {

    const server = Hapi.server({
        port: 3005,
        host: 'localhost'
    });
    server.route(CategoryRoutes);
    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
const expressLoader = require('./express');
const routesLoader = require('./routes');

module.exports = async ({ expressApp, routes }) => {
    await expressLoader({ app: expressApp });
    await routesLoader({  app: expressApp, routes });
    console.log('Express Initialized');
}
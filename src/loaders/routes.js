

// const cors = require('cors');
module.exports = async ({ app, routes }) => {
    // initialize routes i think xd
    app.use('/', routes)
    // Return the express app
    return app;
}
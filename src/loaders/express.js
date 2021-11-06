const express = require('express');
const config = require("../config/index")

// const cors = require('cors');
module.exports = async ({ app }) => {

    app.get('/status', (req, res) => { res.status(200).end(); });
    app.head('/status', (req, res) => { res.status(200).end(); });
    app.enable('trust proxy');
  
    // app.use(cors());
    app.use(require('morgan')('dev'));
    app.use(express.urlencoded({extended: true}))

    app.set('port', config.port || 3000)
    app.set('json spaces', 2)
    app.use(express.json());

  
    // ...More middlewares
  
    // Return the express app
    return app;
  }
require('dotenv').config();
const express = require('express')
const loaders = require('./loaders');

// const { ethers } = require("ethers");

// routes


async function startServer() {
    const app = express()

    await loaders({ expressApp: app, routes: require('./api/routes/index') })
    // start the server

    app.listen(app.get('port'), err => {
        if (err) {
            console.log(err)
            return
        }
        console.log('Hp xd', app.get('port'))
    })
}

startServer()
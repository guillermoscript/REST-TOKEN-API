const { ethers } = require('ethers');
const config = require('../config/index');

function getProvider() {
    // return new ethers.providers.JsonRpcProvider(config.networks.local.url);
    return new ethers.providers.JsonRpcProvider(config.networks.rinkeby.url);
}

module.exports = {
    getProvider
};
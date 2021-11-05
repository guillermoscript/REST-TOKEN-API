const { ethers } = require('ethers');

function createWallet() {
    const Wallet = ethers.Wallet.createRandom();
    console.log(Wallet)
    return Wallet
}

function getWalletFromPrivate(privateKey) {
    const Wallet = ethers.Wallet(privateKey);
    console.log(Wallet)
    return Wallet
}

function connectWalletToPovider(Wallet, provider) {
    const connectedWallet = Wallet.connect(provider);
    return connectedWallet
    
}

module.exports = {
    getWalletFromPrivate,
    createWallet
}
const { getWalletFromPrivate, connectWalletToPovider } = require("./wallet");
const { ethers, providers } = require('ethers');
const { abis } = require("../api/abis");
const { addresses } = require("../api/addresses");

async function sendToken(provider, amount, from, to, privateKey, gasLimit = "0x100000") {
    const wallet = getWalletFromPrivate(privateKey);
    const connectedWallet = connectWalletToPovider(wallet, provider);
    const currentGasPrice = await connectedWallet.getGasPrice();
    const contract = new ethers.Contract(addresses.guilleCoin, abis.guilleCoin, connectedWallet);
    const numberOfTokens = ethers.utils.parseUnits(amount, 18)

    try {
        const tx = await contract.transfer(to, numberOfTokens, { gasLimit, gasPrice: currentGasPrice });
        const receipt = await tx.wait();
        return {
            status: "success",
            receipt
        };
    } catch (error) {
        return error;
    }
}

async function getBalance(provider, address) {
    try {
        const contract = new ethers.Contract(addresses.guilleCoin, abis.guilleCoin, provider);
        const balance = await contract.balanceOf(address);
        return {
            status: "success",
            balance
        };
    } catch (error) {
        return error;
    }
}

async function allowance(provider, address, spender) {
    const contract = new ethers.Contract(addresses.guilleCoin, abis.guilleCoin, provider);
    try {
        const allowance = await contract.allowance(address, spender);
        const number = ethers.utils.formatUnits(allowance, 18);
        return {
            status: "success",
            number
        };
    } catch (error) {
        return error;
    }
}

async function transferFrom(provider, spender, amount, privateKey, gasLimit = "0x100000") {
    const wallet = getWalletFromPrivate(privateKey);
    const connectedWallet = connectWalletToPovider(wallet, provider);
    const currentGasPrice = await connectedWallet.getGasPrice().catch(error => error);
    const contract = new ethers.Contract(addresses.guilleCoin, abis.guilleCoin, connectedWallet);
    const numberOfTokens = ethers.utils.parseUnits(amount, 18)
    try {
        const tx = await contract.transferFrom(connectedWallet.address, spender, numberOfTokens, { gasLimit, gasPrice: currentGasPrice });
        const receipt = await tx.wait();
        return {
            status: "success",
            receipt
        };
    } catch (error) {
        return error;
    }
}

async function approve(provider, spender, amount, privateKey, gasLimit = "0x100000") {
    const wallet = getWalletFromPrivate(privateKey);
    const connectedWallet = connectWalletToPovider(wallet, provider);
    const currentGasPrice = await connectedWallet.getGasPrice().catch(error => error);
    const contract = new ethers.Contract(addresses.guilleCoin, abis.guilleCoin, connectedWallet);
    const numberOfTokens = ethers.utils.parseUnits(amount, 18)
    try {
        const tx = await contract.approve(spender, numberOfTokens, { gasLimit, gasPrice: currentGasPrice });
        const receipt = await tx.wait();
        return {
            status: "success",
            receipt
        };
    } catch (error) {
        return error;
    }
}

module.exports = {
    sendToken,
    getBalance,
    allowance,
    approve,
    transferFrom
}
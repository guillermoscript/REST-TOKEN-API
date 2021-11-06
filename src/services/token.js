const { getWalletFromPrivate, connectWalletToPovider } = require("./wallet");
const { ethers } = require('ethers');
const { abis } = require("../api/abis");
const { addresses } = require("../api/addresses");

async function sendToken(provider, amount, from, to, privateKey, gasLimit = "0x100000") {
    const wallet = getWalletFromPrivate(privateKey);
    const connectedWallet = connectWalletToPovider(wallet, provider);
    const currentGasPrice = await connectedWallet.getGasPrice();
    const contract = new ethers.Contract(addresses.guilleCoin, abis.guilleCoin, connectedWallet);
    const numberOfTokens = ethers.utils.parseUnits(amount, 18)

    const tx = await contract.transfer(to, numberOfTokens);

    const result = await tx.wait();

    return result;

    // const tx = {
    //     from: from,
    //     to: to,
    //     value: numberOfTokens,
    //     nonce: provider.getTransactionCount(
    //         from,
    //         "latest"
    //     ),
    //     gasLimit: ethers.utils.hexlify(currentGasPrice), // 100000
    //     gasPrice: gasLimit,
    // }

    // try {
    //     const succesfullTx = await connectedWallet.sendTransaction(tx)
    //     return succesfullTx
    // } catch (error) {
    //     // alert("failed to send!!")
    //     return error
    // }
}

module.exports = {
    sendToken
}
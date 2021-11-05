const { getWalletFromPrivate } = require("./wallet");

async function sendToken({ provider, amount, from, to, privateKey, gasLimit }) {
    const wallet = getWalletFromPrivate(privateKey);
    const connectedWallet = connectWalletToPovider(wallet, provider);
    const currentGasPrice = await connectedWallet.getGasPrice();
    // const contract = new ethers.Contract(contractAddress, abi, connectedWallet);
    const numberOfTokens = ethers.utils.parseUnits(amount, 18)

    const tx = {
        from: from,
        to: to,
        value: numberOfTokens,
        nonce: provider.getTransactionCount(
            from,
            "latest"
        ),
        gasLimit: ethers.utils.hexlify(currentGasPrice), // 100000
        gasPrice: gasLimit,
    }

    try {
        const succesfullTx = await connectedWallet.sendTransaction(tx)
        return succesfullTx
    } catch (error) {
        // alert("failed to send!!")
        return error
    }
}
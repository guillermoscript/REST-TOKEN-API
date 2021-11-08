const { getWalletFromPrivate, createWallet } = require("../../services/wallet")

class WalletHandler {
    static createWalletHandler(req, res) {
        const { privateKey } = req.body
        if (!privateKey) {
            res.sendStatus(500).json({ error: "Error bro" })
        }
        console.log(privateKey)
        const Wallet = getWalletFromPrivate(privateKey)
        console.log(Wallet)
        res.sendStatus(200).json({
            success: "yey",
            // address: Wallet.address
        })
    }
    static createWalletFromPrivate(req, res) {
        const Wallet = createWallet()
        console.log(Wallet)
        res.send(Wallet)
    }
}

module.exports = WalletHandler
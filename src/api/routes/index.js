const { Router } = require('express')
const provider = require('../../services/provider')
const { getWalletFromPrivate, createWallet } = require('../../services/wallet')
const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/provider', async (req, res) => {
    const help = provider.getProvider()
    res.send(help)
})

router.post('/createWalletFromPrivate', async (req, res) => {
    const { privateKey } = req.body
    if (!privateKey) {
        res.sendStatus(500).json({ error: "Error bro" })
    }
    console.log(privateKey)
    const Wallet = getWalletFromPrivate(privateKey)
    console.log(Wallet)
    res.sendStatus(200).json({
        success: "yey",
        // address: address
    })
})

router.get('/createWallet', async (req, res) => {
    const Wallet = createWallet()
    console.log(Wallet)
    res.send("YEY")
})

module.exports = router
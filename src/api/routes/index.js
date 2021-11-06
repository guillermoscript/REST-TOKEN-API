const { Router } = require('express')
const provider = require('../../services/provider')
const { sendToken } = require('../../services/token')
const { getWalletFromPrivate, createWallet } = require('../../services/wallet')
const router = Router()

router.get('/', (req, res) => {
    res.send('Hello World')
})

router.get('/provider', async (req, res) => {
    const help = provider.getProvider()
    console.log(help);
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

router.post('/sendToken', async (req, res) => {
    const { amount, from, to, privateKey, gasLimit } = req.body
    console.log(req.body);
    if (!privateKey || !amount || !from || !to || !privateKey || !gasLimit) {
        res.sendStatus(500).json({ error: "Error bro" })
    }
    const myProvider = provider.getProvider()
    // console.log(privateKey)
    const tx = await sendToken(myProvider, amount, from, to, privateKey, gasLimit)
    console.log(tx)
    let a = {
        "amount": "1000",
        "from": "0xE0FA5Ca95Fc20887924cc2Ad2b012e7DF8Bfa437",
        "to": "0x786Fd9aFCC7071e0561Cb695dF4F8e25cD9175Cb",
        "privateKey": "",
        "gasLimit": "1000000"
    }
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
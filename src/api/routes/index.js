const { Router } = require('express')
const WalletHandler = require('../handlers/walletHandler')
const TokenHandler = require('../handlers/tokenHandler')
const router = Router()

router.get('/', (req, res) => {
    res.send('Welcome to my first api')
})

// wallet routes
router.get('/createWallet', WalletHandler.createWalletHandler)
router.post('/createWalletFromPrivate', WalletHandler.createWalletFromPrivate)

// token erc-20 routes
router.post('/sendToken', TokenHandler.transer )
router.post('/balanceOf',TokenHandler.balanceOf)
router.post('/allowance',TokenHandler.allowance)
router.post('/approve',TokenHandler.approve)
router.post('/transferFrom',TokenHandler.transferFrom)

module.exports = router
const provider = require('../../services/provider')
const { sendToken } = require('../../services/token')
const { transferFrom } = require('../../services/token');
const { getBalance } = require("../../services/token");
const { approve } = require("../../services/token")
const { allowance } = require("../../services/token")

class TokenHandler {
    constructor(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    static async transferFrom(req, res) {
        const { spender, amount, privateKey } = req.body
        try {
            const result = await transferFrom(getProvider(), spender, amount, privateKey)
            res.status(200).json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json(error)
        }
    }

    static async balanceOf(req, res) {
        const provider = getProvider()
        const balance = await getBalance(provider, address);

        res.json({
            balance,
        });
    }

    static async transer(req, res) {
        const { amount, from, to, privateKey, gasLimit } = req.body
        if (!privateKey || !amount || !from || !to || !privateKey || !gasLimit) {
            res.sendStatus(500).json({ error: "Error bro" })
        }
        const myProvider = provider.getProvider()
        const tx = await sendToken(myProvider, amount, from, to, privateKey, gasLimit)
      
        if (tx.error) {
            res.status(500).json({
                error: tx.error,
                reason: tx.reason
            })
        }

        res.status(200).json({
            success: "yey",
            transactionHash: tx.receipt.transactionHash,
            blockHash: tx.receipt.blockHash,
            blockNumber: tx.receipt.blockNumber,
        })
    }


    static async allowance(req, res) {
        const { token, owner, spender } = req.body
        const result = await allowance(getProvider(), owner, spender).catch(err => {
            console.log(err)
            res.status(500).json({
                status: "error",
                message: err.message
            })
        })
        res.json({
            status: "success",
            data: result
        })
    }

    static async approve(req, res) {
        const { spender, amount, privateKey } = req.body
        const result = await approve(getProvider(), spender, amount, privateKey).catch(err => {
            console.log(err)
            res.status(500).send({
                error: err.message
            })
        })
        res.status(200).json({
            success: "yey",
            result
        })
    }

    setToken(token) {
        this.token = token;
    }
}

module.exports = TokenHandler
var fs = require('fs')
var express = require('express')
let Web3 = require('web3')
let web3 = new Web3('http://127.0.0.1:8545')

// 1. 创建一个路由容器｀｀
var router = express.Router()

// 2. 把路由都挂载到 router 路由容器中
router.get('/eth/getAccounts', function(req, res) {
    let execute = async() => {
        let accounts = await web3.eth.getAccounts()
        return accounts
    }

    execute().then(accounts => {
        res.send(accounts)
    }).catch(error => {
        res.send(error)
    })
})

router.get('/eth/getBalance', function(req, res) {
    let obj = JSON.parse(JSON.stringify(req.body))
    let account = obj.address

    let execute = async(account) => {
        let blance = await web3.eth.getBalance(account)
        return blance
    }

    execute(account).then(blance => {
        res.send(web3.utils.fromWei(blance, 'ether') + " ETH")
    }).catch(error => {
        res.send(error)
    })
})

router.post('/eth/newAccount', function(req, res) {
    let obj = JSON.parse(JSON.stringify(req.body))
    let password = obj.password

    let execute = async(password) => {
        let newAccount = await web3.eth.personal.newAccount(password)
        return newAccount
    }

    execute(password).then(newAccount => {
        res.send(newAccount)
    }).catch(error => {
        res.send(error)
    })
})

// 3. 把 router 导出
module.exports = router
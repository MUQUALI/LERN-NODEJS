var express = require('express')

var router = express.Router()

var controller = require('../controller/product.controler')

router.get('/', controller.index)

module.exports = router
var express = require('express')
var router = express.Router();
var controller = require('../controller/cart.controler')

router.get('/add/:productId', controller.addToCart)

module.exports = router
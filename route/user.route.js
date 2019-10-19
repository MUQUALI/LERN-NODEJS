var express = require('express')
var router = express.Router();
var controller = require('../controller/user.controler')

var multer  = require('multer')
var upload = multer({ dest: './public/uploads/' })

router.get('/', controller.index)

router.get('/search', controller.search)

router.get('/create', controller.getCreate)

router.get('/:id', controller.view)

router.post('/create', upload.single('avartar'), controller.postCreate)


module.exports = router;
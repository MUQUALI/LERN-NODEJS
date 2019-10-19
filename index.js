require('dotenv').config();

var bodyParser = require('body-parser')

var userRouter = require('./route/user.route')

var authRouter = require('./route/auth.route')

var cartRouter = require('./route/cart.route')

var authMiddleware = require('./middlewares/auth.middleware')

var sessionMiddleware = require('./middlewares/session.middleware')

var productRouter = require('./route/product.route')

var cookieParser = require('cookie-parser')


var express = require('express')
var app = express()
var port = 3000

app.set('view engine', 'pug')

app.get('/', function(req, res) {
	res.send('<h1>hello NDM</h1>')
})

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(cookieParser(process.env.SECRET_COOKIE));

app.use(sessionMiddleware)

app.use('/users', authMiddleware.requireAuth, userRouter);

app.use('/products', authMiddleware.requireAuth, productRouter)

app.use('/cart', authMiddleware.requireAuth, cartRouter)

app.use('/auth', authRouter);

app.use(express.static('public'))

app.listen(port, function() {
	console.log(`Example app listening on port ${port}!`);
})


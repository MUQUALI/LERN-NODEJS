var db = require('../db');

module.exports.index = function(req, res) {
	var page = parseInt(req.query.page) || 1;
	var perPage = 4;
	var start = (page-1) * perPage;
	var end = page * perPage;
	// config pagination
	var totalRecord = db.get('products').size().value()
	var totalPage = Math.ceil(totalRecord / perPage)

    var curentPage = page

	res.render('products/index', {
		products: db.get('products').value().slice(start, end),
		totalPages: totalPage,
		curentPage: curentPage
	})
}
var db = require('../db');

var shortid = require('shortid')

module.exports.index = function(req, res) {
	res.render('user/index', {
		users: db.get('users').value(),
		title: 'Trang Chu'
	});
}

module.exports.search = function(req, res) {
	var q = req.query.q;
	var listSearch =  db.get('users').value().filter(function(item) {
		return item.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('user/index', {
		users: listSearch,
	});
}

module.exports.getCreate = function(req, res) {
	res.render('user/create', { title: 'Create' })
}

module.exports.view = function(req, res) {
	var id = req.params.id;
	var userFind = db.get('users').find({id: id}).value();

	res.render('user/view', {
		user: userFind
	});
}

module.exports.postCreate = function(req, res) {
	req.body.id = shortid.generate();
	req.body.avartar = req.file.path.split("\\").slice(1).join('/')
	var errs = [];

	if(!req.body.name) {
		errs.push("name is require");
	}

	if(!req.body.phone) {
		errs.push("phone is require");
	}

	if(errs.length) {
		res.render('user/create', { 
			title: 'Create',
			errs: errs,
			values: req.body
		});
		return;
	}

	db.get('users').push(req.body).write();
	res.redirect('/users');
}


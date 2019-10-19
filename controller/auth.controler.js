var db = require('../db');


module.exports.login = function(req, res) {
	res.render('auth/login', {
		title: 'Login'
	});
}

module.exports.postLogin = function(req, res) {

	var email = req.body.email;
	var password = req.body.password;
	var errs = [];

	var user = db.get('users').find({email: email}).value();

	if(!user) {
		errs.push("sai rồi e ơi");
		res.render('auth/login', {
			errs: errs,
			title: "Login"
		})
		return;
	}

	if(user.password !== password) {
		errs.push("sai pass e ơi");
		res.render('auth/login', {
			errs: errs,
			title: "Login"
		})
		return;
	}

	res.cookie('userID', user.id, {
		signed: true
	});
	res.redirect("/users")
}
var db = require('../db');

module.exports.requireAuth = function(req, res, next) {
	var userID = req.signedCookies.userID;
	if(!userID) {
		res.redirect("/auth/login");
		return;
	}

	var user = db.get('users').find({id: userID}).value();

	if(!user) {
		res.redirect("/auth/login");
		return;		
	}

	res.locals.user = user;// hiển thị tên người dùng có hạn trong 1 vòng đời req, res

	next();
}
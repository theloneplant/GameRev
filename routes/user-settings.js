var path = require('path');

module.exports = function(req, res) {
	var query = new Parse.Query(Parse.User);

	query.equalTo('username', req.params.user);
	query.first({
		success: function(user) {
			console.log(user);
			var data = {
						id: user.id,
						myUsername: user.getUsername(),
						myUserPic: user.get('userPic'),
						email: user.get('email'),
			};
		}

	require(path.join(__dirname, 'header')).renderPage(req, res, 'user-settings');
};
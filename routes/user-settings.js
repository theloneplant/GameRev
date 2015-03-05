var path = require('path');
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

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
				email: user.get('email')
			};
			console.log(data);
			require(path.join(__dirname, 'header')).renderPage(req, res, 'user-settings');
		}
	});		
};
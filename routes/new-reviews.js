var path = require('path');
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

module.exports = function(req, res) {
	if (!Parse.User.current()) {
		res.redirect('login');
	}
	else {
		var Game = Parse.Object.extend('Games');
		var query = new Parse.Query(Game);
		query.equalTo('ref', req.params.game);
		query.first({
			success: function(gameData) {
				console.log(req.params.game);
				var datum = {
					title: gameData.get('title'),
					image: gameData.get('image'),
					banner: gameData.get('banner'),
					ref: req.params.game
				};

				require(path.join(__dirname, 'header')).renderPage(req, res, 'new-reviews', datum);
			}
		});
	}
};
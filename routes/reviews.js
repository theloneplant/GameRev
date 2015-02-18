var path = require('path');
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

module.exports = function(req, res) {
	var Review = Parse.Object.extend('Reviews');
	var query = new Parse.Query(Review);

	query.get(req.params.review, {
		success: function(review) {

			review.relation('user').query().find({
				success: function(user) {

					review.relation('game').query().find({
						success: function(game) {
							var data = {
								id: review.id,
								title: review.get('title'),
								rating: review.get('rating'),
								reviewBody: review.get('reviewBody'),
								tldr: review.get('tldr'),
								user: {
									username: user.username
									// Add more to user later on
								},
								game: {
									title: game.title,
									ref: game.ref
									// Add more to game later on
								},
								timestamp: review.createdAt
							}
							require(path.join(__dirname, 'header')).renderPage(req, res, 'reviews', data);
						}
					});
				}
			});
		},
		error: function(review, error) {
			console.log(error);
		}
	});
};
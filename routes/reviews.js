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
							var goodArr = review.get('theGood').split('\t');
							var okayArr = review.get('theOkay').split('\t');
							var badArr = review.get('theBad').split('\t');

							var data = {
								id: review.id,
								title: review.get('title'),
								rating: review.get('rating'),
								reviewBody: review.get('reviewBody'),
								theGood: [],
								theOkay: [],
								theBad: [],
								bannerImage: review.get('bannerImage'),
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

							goodArr.forEach(function(e) {
								data.theGood.push({
									value: e
								});
							});
							data.theGood.pop(); // Remove trailing tab

							okayArr.forEach(function(e) {
								data.theOkay.push({
									value: e
								});
							});
							data.theOkay.pop();

							badArr.forEach(function(e) {
								data.theBad.push({
									value: e
								});
							});
							data.theBad.pop();

							console.log(data.theGood);

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
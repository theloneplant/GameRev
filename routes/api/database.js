var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

this.addReview = function(req, res) {
	var user = Parse.User.current();

	var Review = Parse.Object.extend('Reviews');
	var review = new Review();
	review.set('title', req.body.newReview['title']);
	review.set('rating', req.body.newReview['rating']);
	review.set('reviewBody', req.body.newReview['reviewBody']);
	review.set('tldr', req.body.newReview['tldr']);
	review.set('likes', parseInt(req.body.newReview['likes']));
	review.set('bannerImage', req.body.newReview['bannerImage']);

	var Games = Parse.Object.extend('Games');
	var gameQuery = new Parse.Query(Games);

	// Find the game that this review will have a relation with
	gameQuery.equalTo('title', req.body.game);
	gameQuery.first({
		success: function(game) {
			var userReviewRelation = user.relation('reviews');
			var gameReviewRelation = game.relation('reviews');

			// Add the relation from the review to the user
			var reviewUserRelation = review.relation('user');
			reviewUserRelation.add(user);

			// Add the relation from the review to the game
			var reviewGameRelation = review.relation('game');
			reviewGameRelation.add(game);

			// Save the review and add relations going back from user and game to review
			review.save(null, {
				success: function(result) {
					console.log(result.id);

					// Add relation from user to review
					userReviewRelation.add(result);
					user.save();

					// Add relation from game to review
					gameReviewRelation.add(result);
					game.save();
				},
				error: function(result, error) {
					console.log("review error: ", error.message);
				}
			});
		},
		error: function(result, error) {
			console.log("game error: ", error.message);
		}
	});
	basicResponse(res, true);
};

var basicResponse = function(res, $success, $data) {
	res.send({
		success : $success,
		data    : $data
	});
};
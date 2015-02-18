var path = require('path');
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

module.exports = function(req, res) {
	var query = new Parse.Query(Parse.User);

	query.equalTo('username', req.params.user);
	query.first({
		success: function(user) {
			console.log(user);
			user.relation('reviews').query().find({
				success: function(reviews) {
					var data = {
						id: user.id,
						username: user.get('username'),
						email: user.get('email'),
						reviews: []
					};

					reviews.forEach(function(review) {
						// Format a summary for each review
						var summary = review.get('reviewBody').replace(/<(?:.|\n)*?>/gm, '');
						if (summary.length > 200)
						{
							summary = summary.substring(0, 200);
							summary = summary.split(' ');
							summary.pop();
							summary = summary.join(' ');
							summary += '...';
						}

						data.reviews.push({
							id: review.id,
							title: review.get('title'),
							rating: review.get('rating'),
							summary: summary,
							review: review.get('review'),
							tldr: review.get('tldr'),
							timestamp: review.createdAt
						});
					});

					console.log(data);
					require(path.join(__dirname, 'header')).renderPage(req, res, 'users', data);
				}
			});
		},
		error: function(review, error) {
			console.log(error);
		}
	});
};
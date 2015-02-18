var path = require('path');
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

module.exports = function(req, res) {
	var Game = Parse.Object.extend('Games');
	var query = new Parse.Query(Game);
	query.equalTo('ref', req.params.game);
	query.first({
		success: function(gameData) {
			gameData.relation('reviews').query().find({
				success: function(reviews) {
					var data = {
						title: gameData.get('title'),
						image: gameData.get('image'),
						banner: gameData.get('banner'),
						developer: gameData.get('developer'),
						publisher: gameData.get('publisher'),
						releaseDate: gameData.get('releaseDate'),
						description: gameData.get('description'),
						verdict: gameData.get('verdict'),
						percentageGood: (100 * gameData.get('totalRating') / reviews.length).toFixedDown(1),
						reviews: []
					};

					var userQueries = [];
					reviews.forEach(function(review) {
						userQueries.push(review.relation('user').query().find());
					});


					Parse.Promise.when(userQueries).then(function(poop) {
						for (var i = 0; i < arguments.length; i++) {
							// Format a summary for each review
							var summary = reviews[i].get('reviewBody').replace(/<(?:.|\n)*?>/gm, '');
							if (summary.length > 200)
							{
								summary = summary.substring(0, 200);
								summary = summary.split(' ');
								summary.pop();
								summary = summary.join(' ');
								summary += '...';
							}

							data.reviews.push({
								id: reviews[i].id,
								title: reviews[i].get('title'),
								rating: reviews[i].get('rating'),
								summary: summary,
								review: reviews[i].get('review'),
								tldr: reviews[i].get('tldr'),
								user: {
									username: arguments[i][0].get('username')
									// Add more to user later on
								},
								timestamp: reviews[i].createdAt
							});
						}
						
						require(path.join(__dirname, 'header')).renderPage(req, res, 'game', data);
					});
				}
			});
		},
		error: function(error) {
			console.log('things ', error);
			res.writeHead(302, {
	            'Location': '/'
	        });
	        res.end();
		}
	});
};

Number.prototype.toFixedDown = function(digits) {
    var re = new RegExp("(\\d+\\.\\d{" + digits + "})(\\d)"),
        m = this.toString().match(re);
    return m ? parseFloat(m[1]) : this.valueOf();
};
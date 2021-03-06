var path = require('path');
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

module.exports = function(req, res) {
	var createReviewHref = 'href="/login"';
	console.log(Parse.User.current());
	if (Parse.User.current()) {
		createReviewHref = '';
	};

	var Review = Parse.Object.extend('Reviews');
	var query = new Parse.Query(Review);
	query.addDescending('views');
	query.limit(12);

	query.find({
		success: function(reviews) {
			var gameQuery = [];
			var data = {
				featuredSlider: [
					{
						active: "active",
						id: "featured-1",
						href: "/games/dragon-age-inquisition",
						src: "/images/dai-cover.jpg"
					},
					{
						id: "featured-2",
						href: "/games/infamous",
						src: "/images/infamous_banner.jpg"
					},
					{
						id: "featured-3",
						href: "/games/skyrim",
						src: "/images/skyrim_banner.jpg"
					},
					{
						id: "featured-4",
						href: "/games/final-fantasy-XV",
						src: "/images/finalfantasyxv_banner.jpg"
					},
					{
						id: "featured-5",
						href: "/games/revelations",
						src: "/images/revelations_banner.png"
					}
				],
				createReviewHref: createReviewHref,
				reviews: []
			};

			reviews.forEach(function(review, i) {
				gameQuery.push(review.relation('game').query().find());
				data.reviews.push({
					id: review.id,
					title: review.get('title'),
					rating: review.get('rating'),
					summary: createSummary(review.get('reviewBody'), 170),
					tldr: review.get('tldr'),
					bannerImage: review.get('bannerImage'),
					game: {
						title: '',
						ref: ''
					}
				});
			});

			Parse.Promise.when(gameQuery).then(function(poop) {
				for (var i = 0; i < arguments.length; i++) {
					// Format a summary for each review
					data.reviews[i].game.title = arguments[i][0].get('title');
					data.reviews[i].game.ref = arguments[i][0].get('ref');
				}
				
				require(path.join(__dirname, 'header')).renderPage(req, res, 'index', data);
			});
		},
		error: function(review, error) {
			console.log(error);
		}
	});
};

var createSummary = function(review, length) {
	var summary = review.replace(/<(?:.|\n)*?>/gm, '');
	if (summary.length > length)
	{
		summary = summary.substring(0, length);
		summary = summary.split(' ');
		summary.pop();
		summary = summary.join(' ');
		summary += '...';
	}
	return summary;
};
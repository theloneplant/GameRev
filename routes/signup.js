var path = require('path');

module.exports = function(req, res) {
	require(path.join(__dirname, 'header')).renderPage(req, res, 'signup');
};
var path = require('path');
var users = require(path.join(__dirname, 'users'));
var database = require(path.join(__dirname, 'database'));

module.exports = function(req, res) {
	if( req.params.call === 'processSignup' )
		users.processSignup (req, res);
	else if( req.params.call === 'processLogin' ) 
		users.processLogin (req, res);
	else if( req.params.call === 'processLogout' ) 
		users.processLogout (req, res);
	else if( req.params.call === 'addReview')
		database.addReview(req, res);
	else 
		error (req, res);
};

var error = function(req, res) {
	res.send('Invalid API call');
};
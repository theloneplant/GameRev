var data = require('../data.json');
var fs = require('fs');
var path = require('path');

data.header = fs.readFileSync(path.join(__dirname, '../views/templates/header.handlebars')).toString();
data.footer = fs.readFileSync(path.join(__dirname, '../views/templates/footer.handlebars')).toString();

module.exports = function(req, res) {
	res.render('featured-reviewers', data);
};
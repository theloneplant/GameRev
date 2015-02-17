var fs = require('fs');
var path = require('path');
var handlebars = require('express3-handlebars');
var helpers = handlebars.create({
	helpers: {
		toLowerCase: function(str) {
			return str.toLowerCase();
		}
	}
});
var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

this.renderPage = function(req, res, route, moarDatum) {
	var data = require('../data.json');
	data.username = '';
	data.loggedIn = false;

	data.header = path.join(__dirname, '../views/templates/header.handlebars');
	data.footer = path.join(__dirname, '../views/templates/footer.handlebars');
	data.page = route;
	var currentUser = Parse.User.current();

	try {
		fs.readFileSync(path.join(__dirname, '../public/js/' + data.page + '-controller.js')).toString();
		data.loadScript = true;
	}
	catch (e) {
		data.loadScript = false;
	}

	if (moarDatum) {
		mergeJSON(data, moarDatum);
	}

	if (currentUser) {
		data.loggedIn = true;
		data.username = currentUser.getUsername();
	}
	else {
		data.loggedIn = false;
	}
	console.log(data.title);

	helpers.render(data.header, data, function(err, result) {
		data.header = result;
		helpers.render(data.footer, data, function(err, result) {
			data.footer = result;
			console.log(data.username);
			res.render(route, data);
		});
	});
};

var mergeJSON = function(obj1, obj2) {
	Object.keys(obj2).forEach(function(p){
		try {
			if (obj2[p].constructor === Object) {
				obj1[p] = MergeRecursive(obj1[p], obj2[p]);
			}
			else {
				obj1[p] = obj2[p];
			}
		}
		catch( e) {
			obj1[p] = obj2[p];
		}
	});
	return obj1;
}
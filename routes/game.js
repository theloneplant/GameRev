var data = require('../data.json');
var fs = require('fs');
var path = require('path');
var derp = false;

module.exports = function(req, res) {
	data.gamepage.games.forEach(function(e, i) {
		console.log(e.ref, req.params);
		if(e.ref === req.params.game) {
			derp = data.gamepage.games[i];
		}
	});
	derp.header = fs.readFileSync(path.join(__dirname, '../views/templates/header.handlebars')).toString();
	derp.footer = fs.readFileSync(path.join(__dirname, '../views/templates/footer.handlebars')).toString();

	if (derp) {
		res.render('game', derp);
		derp = false;
	}
	else {
		res.writeHead(302, {
            'Location': '/'
        });
        res.end();
	}
};
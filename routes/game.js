var data = require('../data.json');
var path = require('path');
var derp = false;

module.exports = function(req, res) {
	data.gamepage.games.forEach(function(e, i) {
		console.log(e.ref, req.params);
		if(e.ref === req.params.game) {
			derp = data.gamepage.games[i];
		}
	});

	if (derp) {
		require(path.join(__dirname, 'header')).renderPage(req, res, 'game', derp);
		derp = false;
	}
	else {
		res.writeHead(302, {
            'Location': '/'
        });
        res.end();
	}
};
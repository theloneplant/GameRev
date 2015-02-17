var Parse = require('parse').Parse;
Parse.initialize('8ND8FWpNrWD1j2zkGymXBFAGWebC7xiuA2GT7zAk', 'tYcMRGV7XEpjFv782VzQ2ezItHVuU40vsCMZ71DU');

this.processSignup = function(req, res) {
	var user = new Parse.User();
	user.set("username", req.body.username);
	user.set("password", req.body.password);
	user.set("email", req.body.email);
	
	user.signUp(null, {
		success: function(user) {
			// Hooray! Let them use the app now.
			basicResponse(res, true);
		},
		error: function(user, error) {
			basicResponse(res, false, { error: error.code });

			// Show the error message somewhere and let the user try again.
			console.log("Error: " + error.code + " " + error.message);
		}
	});
};

this.processLogin = function(req, res) {
	Parse.User.logIn(req.body.username, req.body.password, {
		success: function(user) {
			// Hooray! Let them use the app now.
			//var banana = user.relation('reviews');
			
			//banana.add();
			
			/*var derp = Parse.Object.extend('_User');
			var herp = new Parse.Query(derp);
			herp.equalTo('objectId', user.id);

			herp.find({
				success: function(result) {
					console.log("result: ", result);
					var shlerp = result[0];
					shlerp.set('reviews', []);
				},
				error: function(error) {
					console.log(error);
				}
			});
			*/
			basicResponse(res, true, user);
		},
		error: function(user, error) {
			basicResponse(res, false, { error: error.code });

			// Show the error message somewhere and let the user try again.
			console.log("Error: " + error.code + " " + error.message);
		}
	});
};

this.processLogout = function(req, res) {
	Parse.User.logOut();
	basicResponse(res, true);
};

var basicResponse = function(res, $success, $data) {
	res.send({
		success : $success,
		info    : $data
	});
};
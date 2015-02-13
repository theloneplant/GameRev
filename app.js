/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars');
var helpers = handlebars.create({
	helpers: {
		toLowerCase: function(str) {
			return str.toLowerCase();
		}
	}
});

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', helpers.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon(path.join(__dirname, 'public','images','favicon.ico')));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
var pages = ['about', 'featured-games', 'featured-reviewers', 'login', 'logout', 'new-review', 'profile', 'profile-settings',  'review', 'search', 'subscribe', 'subscribed', 'terms'];

app.get('/', require('./routes/index'));
['/header', '/footer'].forEach(function(thing){
	app.get(thing, function(req, res){
		res.render('templates' + req.originalUrl);
	});
});

app.get('/games/:game?', require('./routes/game'));

pages.forEach(function(page) {
	app.get('/' + page, require('./routes/' + page));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
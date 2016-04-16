var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './client/static')));

var routeSetter = require('./server/config/routes.js');
routeSetter(app);

app.listen(8000, function() {
	console.log('The server will be listening on port 8000');
});
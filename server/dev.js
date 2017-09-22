const bodyParser = require('body-parser');
const compression = require('compression');
const express = require('express');
const fs = require('fs');
const path = require('path');
const server = module.exports = express();

// Body parsing
server.use(bodyParser.json());

// GZIP
server.use(compression());

// Route loading
let routePath = path.join(__dirname, 'api');
fs.readdir(routePath, function(err, files) {
	files.forEach(function(file) {
		if(file.endsWith('.route.js')) {
			console.log('Loading routes from', file);
			require(path.join(routePath, file));
		}
	});
});

// Middleware
server.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.setHeader('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate');
	next();
});
server.all(/api/, function(req, res, next) {
	res.setHeader('Access-Control-Allow-Methods', 'DELETE, GET, OPTIONS, PATCH, POST, PUT');
	res.setHeader('Content-Type', 'application/json');
	next();
});

server.use('/', express.static('dist'));
server.listen(9001);
console.log('Server running on port 9001');

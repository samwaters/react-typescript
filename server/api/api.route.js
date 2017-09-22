const server = require('../dev.js');

server.get('/api/time', (req, res) => {
	res.send(JSON.stringify({ok: true, time: new Date().getTime()}));
});


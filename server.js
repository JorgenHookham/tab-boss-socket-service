'use strict';

const express = require('express');
const SocketServer = require('ws').Server;
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;

const server = express()
	.use(bodyParser.json())
	.post('/broadcast', (req, res) => {
		broadcast(req.body.message);
		res.send('OK');
	})
	.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer({ server });

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('close', () => {
		console.log('Client disconnected')
	});

	ws.on('message', (data) => {
		ws.secret = data;
	});
});

setInterval(() => {
	broadcast({type: 'checkin', message: new Date().toTimeString()});
}, 10000);

function broadcast (data) {
	console.log(data);
	wss.clients.forEach(function each(client) {
		console.log(client.secret);
		client.send(JSON.stringify(data));
	});
}

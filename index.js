const WebSocket = require('ws');

const wss = new WebSocket.Server({port: 8080});

const stdin = process.openStdin();

wss.broadcast = function broadcast (data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
    });
}

stdin.addListener("data", function(d) {
    let input = d.toString().trim();
    wss.broadcast(input);
    console.log(`You said "${input}"`);
});

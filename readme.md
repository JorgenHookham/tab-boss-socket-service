# Tab Boss Sockets Service

A simple web sockets service to integrate with the [Tab Boss chrome extension](https://github.com/JorgenHookham/tab-boss.git).

## Try It Out

1. `npm i`
2. `npm start`
3. Configure Tab Boss extension to connect to your local socket service `ws://localhost:3000`
4. `curl -H "Content-Type: application/json" -d '{"message":"Bonjourno"}' http://localhost:3000/broadcast`

console.log("Server started");
const WebSocketServer = require('ws').Server;
const player = require('./player')
const breweries = require('./breweries')
const game = require('./game')

const wss = new WebSocketServer({port: process.env.PORT || 3000});
wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    processMessage(ws, message);
  });
  ws.on("close", function(ev) {
    console.log('Server disconnected, reason: ' + ev.code);
  })
});

function processMessage(ws,message) {
  console.log('Received from client: %s', message);
  const json = JSON.parse(message)
  if (json.headers) json.headers.reqStatus = 'success'
  routeMessage(ws,json);
}

function routeMessage(ws, json) {
  const method = json.headers?.reqName ?? ''
  switch (method) {
    case '/player/auth':
    case '/player/register':
      json.body = player.authResponse()
      break
    case '/player/authOT':
      const name = json.body?.player?.name
      json.body = player.authGuestResponse(name)
      break
    case '/player/getGuestList':
      json.body = player.getGuestListResponse()
      break
    case '/brewery/getList':
      json.body = breweries.getBreweryListResponse()
      break
    case '/game/getTime':
      json.body = game.getTime()
      break
  }
  const response = JSON.stringify(json)
  console.log('Send to client: %s', response);
  ws.send(response)
}
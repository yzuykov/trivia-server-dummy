console.log("Server started");
const WebSocketServer = require('ws').Server;


const randomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

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
      json.body = authResponse()
      break
    case '/brewery/getList':
      json.body = getBreweryListResponse()
      break
  }
  const response = JSON.stringify(json)
  console.log('Send to client: %s', response);
  ws.send(response)
}

const authResponse = () => {
  return {'player': {'id': 123, 'token': randomToken()}}
}

const getBreweryListResponse = () => {
  return {
    'breweries': [
        {
            "id": 777,
            "name": "Пивбар #1",
            "address": "Москва, Лужнецкая набережная, 1",
            "coordinates": "55.755831,37.617673",
            "tz": "UTC+3:00"
        },
        {
            "id": 123,
            "name": "Пивград",
            "address": "Санкт-Петербург, Невский проспект, 45",
            "coordinates": "59.930534,30.348926",
            "tz": "UTC+3:00"
        }
    ]
  }
}


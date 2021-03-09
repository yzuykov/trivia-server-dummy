import WebSocket from 'ws';
import player from './player';
import breweries from './breweries';
import game from './game';


class TriviaDummyServer {
  private wss: WebSocket.Server;

  constructor() {
    const _this = this;
    this.wss = new WebSocket.Server({port: Number(process.env.PORT || 3000)});
    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => _this.processMessage(ws, message));
      ws.on("close", (code: number, reason: string) => console.log(`Server disconnected - code: ${code}, reason: ${reason}`))
    });
    console.log("Server started");
  }

  processMessage(ws: WebSocket, message: string) {
    console.log('Received from client: %s', message);
    const json = JSON.parse(message)
    if (json.headers) json.headers.reqStatus = 'success'
    this.routeMessage(ws,json);
  }
  
  routeMessage(ws: WebSocket, json: any) {
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
}

new TriviaDummyServer();
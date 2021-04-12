import express, { Application } from 'express';
import http from 'http';
import cors from 'cors';
import WebSocket from 'ws';
import { schedule } from 'node-cron';
import player from './player';
import breweries from './breweries';
import game from './game';
import ratings from './ratings';
import { Server } from 'node:http';

function* range(x: number, y: number) {
  while (true) {
    if (x <= y)
      yield x++;

    else
      return null;
  }
}

class TriviaDummyServer {
  private app: Application;
  private wss: WebSocket.Server;
  private server: Server;

  constructor() {
    const _this = this;
    this.app = express();
    this.routeMessages();
    this.server = http.createServer(this.app);
    this.wss = new WebSocket.Server({server: this.server});
    this.wss.on('connection', (ws: WebSocket) => {
      ws.on('message', (message: string) => {
        if (!JSON.parse(message).header?.method?.includes('Response'))
          ws.send(message)
      });
      ws.on('close', (code: number, reason: string) => console.log(`Clent disconnected - code: ${code}, reason: ${reason}`))
    });
    schedule('0 0,30 11-22 * * *', () => {
      Array.from(range(1, 15)).forEach(num => {
        let round = Math.ceil(num/5)
        let question = num - (5 * (round - 1))
        setTimeout(() => _this.wss.clients.forEach((client: WebSocket) => game.sendQuestion(client,round,question)), (num - 1) * 80 * 1000)
        if (num % 5===0) {
          setTimeout(() => _this.wss.clients.forEach((client: WebSocket) => game.sendContent(client)), (num - 1) * 80 * 1000)
        }
        if (num === 15) {
          setTimeout(() => _this.wss.clients.forEach((client: WebSocket) => ratings.sendRatingsOne(client)), (num - 1) * 80 * 1000)
          setTimeout(() => _this.wss.clients.forEach((client: WebSocket) => ratings.sendRatingsTwo(client)), (num - 1) * 80 * 1000)
        }
      })
    })
    this.server.listen(Number(process.env.PORT || 3000));
    console.log("Server started");
  }

  routeMessages() {
    const _this = this;
    this.app.use(express.json());
    this.app.use(cors())
    this.app.get('/', function(req, res) {
      res.sendFile(__dirname + '/public/index.html');
    });
    this.app.post('/broadcast', function(req, res) {
      const stringBody = JSON.stringify(req.body);
      console.log(stringBody)
      _this.wss.clients.forEach((client: WebSocket) => {client.send(stringBody)})
      res.status(200).send();
    });
    this.app.get("/brewery/getList", (req,res) => res.json(breweries.getBreweryListResponse()))
    this.app.get("/brewery/registerDisplay", (req,res) => res.json(game.sendContentPlasma()))
    this.app.get("/player/getGuestList", (req,res) => res.json(player.getGuestListResponse()))
    this.app.post("/player/register", (req,res) => player.authResponse(req,res))
    this.app.post("/player/auth", (req,res) => player.authResponse(req,res))
    this.app.post("/player/authOT", (req,res) => {
      const name = req.body?.player?.name
      res.json(player.authGuestResponse(name))
    })
    this.app.post("/player/regForGame", (req,res) => res.json(game.getTime()))
    this.app.post("/player/regGuest", (req,res) => res.status(204).send())
    this.app.post("/player/edit", (req,res) => res.status(204).send())
    this.app.get("/player/getHistory", (req,res) => res.json(player.getGameHistoryResponse()))
    this.app.get("/player/getRating", (req,res) => res.json(player.getRaingResponse()))
    this.app.get("/player/getInfo", (req,res) => res.json(player.getInfo()))
    this.app.post("/player/unreg", (req,res) => res.status(204).send())
    this.app.post("/player/disqualify", (req,res) => res.status(204).send())
    this.app.post("/game/sendAnswer", (req,res) => res.json(game.getLeaderboard()))
    this.app.get("/game/getCurrentRating", (req,res) => res.json(game.getLeaderboard()))
    this.app.get("/game/getTime", (req,res) => res.json(game.getTime()))
    this.app.get("/game/getSettings", (req,res) => res.json(game.getSettings()))
  }
}

new TriviaDummyServer();
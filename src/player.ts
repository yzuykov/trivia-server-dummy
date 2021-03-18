import { Request, Response } from "express";
import { SocketMessage } from "./types";

const randomToken = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

const player = {
  authResponse: (req: Request, res: Response) => {
    console.log(req.body)
    const nick = req.body?.player?.nick
    const pass = req.body?.player?.pass
    if (nick==='player' && pass==='player') {
      res.json({'player': {'id': 123, 'token': randomToken()}})
    } else {
      res.status(400).json({'code': 203, 'description': 'auth failed'})
    }
  },
  authGuestResponse: (name: string) => {
    return {'player': {'id': 123, 'name': name, 'token': randomToken()}}
  },
  getGuestListResponse: () => {
    return {'players': [{'id': 1, 'name': 'Рабинович'},{'id': 2, 'name': 'Вассерман'},{'id': 3, 'name': 'Бурда'}]}
  },
  getRaingResponse: () => {
    return {'rating': {'points': 10232, 'rank': 1, 'active': 0}}
  },
  getInfo: () => {
    return {
      "player":{
         "nick":"Хитрый мозг",
         "name":"Иван",
         "surname":"Сергеев",
         "email":"bigbrain@gmail.com"
      }
   }
  },
  getGameHistoryResponse: () => {
    return {"games": [
      {
         "id":102,
         "brewery":"Пивбар #1",
         "time":"12.12.2021 11:00:00",
         "points":612.05
      },
      {
         "id":103,
         "brewery":"Пивбар #1",
         "time":"16.12.2021 18:30:00",
         "points":4988.50
      },
      {
         "id":104,
         "brewery":"Пивбар #1",
         "time":"12.12.2021 11:00:00",
         "points":612.05
      },
      {
         "id":105,
         "brewery":"Пивбар #1",
         "time":"16.12.2021 18:30:00",
         "points":4988.50
      },
      {
         "id":106,
         "brewery":"Пивбар #1",
         "time":"12.12.2021 11:00:00",
         "points":612.05
      },
      {
         "id":107,
         "brewery":"Пивбар #1",
         "time":"16.12.2021 18:30:00",
         "points":4988.50
      },
    ]}
  }
}

export default player;
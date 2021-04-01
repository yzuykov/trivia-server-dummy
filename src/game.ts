import { DateTime } from 'luxon';
import WebSocket from 'ws';
import { SocketMessage } from './types';
import {questions} from './questions';

const game = {
  getTime: () => {
    const now = DateTime.now();
    const remainder = 30 - (now.minute % 30);
    const gameTime = now.plus({minute: remainder})
    return {
      "time" :{
        "game": [
          (gameTime.toLocaleString(DateTime.TIME_24_SIMPLE) + ":00"), 
          (gameTime.plus({minutes: 30}).toLocaleString(DateTime.TIME_24_SIMPLE) + ":00")
        ],
        "server": now.toISOTime().split('.')[0]
      }
    }
  },
  getSettings: () => {
    return {
      "settings": [
        {"name":"DISTANCE_GAMEOVER", "value": 40},
        {"name":"DISTANCE_WARNING", "value": 30},
      ]
    }
  },
  getLeaderboard: () => {
    return {
      "leaderboard": {
         "points":{
            "question":672.65,
            "total":996.20
         },
         "rank":23
      }
    }
  },
  sendQuestion: (client: WebSocket, roundNum?: number, questionNum?: number) => {
    const now = DateTime.now();
    const keyQuestion = 0 + (questionNum || 1)
    const json: SocketMessage = {
      headers:{
         method:"/game/sendQuestion",
         id:12403518
      },
      body:{
         "game":{
            "id":10,
            "round": roundNum || 1,
            "question":questions.get(keyQuestion)
         },
         "time":{
            "server": now.toISOTime().split('.')[0],
            "question": now.toLocaleString(DateTime.TIME_24_SIMPLE) + ":01"
         }
      }
   }   
   const request = JSON.stringify(json);
   console.log('Send to client request: %s', request);
   client.send(request)
  },
  sendContent: (client: WebSocket) => {
    const json: SocketMessage = {
      headers:{
         method:"/game/sendContent",
         id:12403518
      },
      body:{
         "content":[
            {
              type:"video",
              url:"https://zabbix.wsoft.ru/distrs/moto_1920.mp4",
              duration: 20
            },
            {
              type:"image",
              url:"https://bulma.io/images/placeholders/256x256.png",
              duration: 20
            },
            {
              type:"text",
              text:"Привет, кероснищики!",
              duration: 20
            }
          ]
      }
   }   
   const request = JSON.stringify(json);
   console.log('Send to client request: %s', request);
   client.send(request)
  },
  sendContentPlasma: () => {
    return {
        "content":[
           {
             type:"video",
             url:"https://zabbix.wsoft.ru/distrs/moto_1920.mp4",
             duration: 20
           },
           {
             type:"image",
             url:"https://bulma.io/images/placeholders/640x360.png",
             duration: 20
           },
           {
             type:"text",
             text:"Привет, кероснищики!",
             duration: 20
           }
        ]
  }
 }
}

export default game;
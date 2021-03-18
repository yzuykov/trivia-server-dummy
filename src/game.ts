import { DateTime } from 'luxon';
import WebSocket from 'ws';
import { SocketMessage } from './types';

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
    const json: SocketMessage = {
      headers:{
         method:"/game/sendQuestion",
         id:12403518
      },
      body:{
         "game":{
            "id":10,
            "round": roundNum || 1,
            "question":{
               "id":425,
               "num": questionNum || 1,
               "text":"Какой ответ на главный вопрос Жизни, Вселенной и Всего остального?",
               "answers":[
                  {
                     "text":"Свобода, равенство, братство!",
                     "id":2122
                  },
                  {
                     "text":"Veni, vidi, vici",
                     "id":2125,
                     "isRight":1
                  },
                  {
                     "text":"Диоксид водорода",
                     "id":2121
                  },
                  {
                     "text":"42",
                     "id":2124
                  },
                  {
                     "text":"Колодин - пушка страшная!",
                     "id":2123
                  }
               ],
               "hints":[
                  "Черданцев тут ни при чём",
                  "Ответ был дан в книге 'Автостопом по Галактике'",
                  "Ответ был дан ИИ Deep Thought"
               ],
               "fact":"Джо Байден - 46й Президент США"
            }
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
         "content":{
            type:"video",
            url:"https://zabbix.wsoft.ru/distrs/moto_1920.mp4",
         }
      
      }
   }   
   const request = JSON.stringify(json);
   console.log('Send to client request: %s', request);
   client.send(request)
  }
}

export default game;
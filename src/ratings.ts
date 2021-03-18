import WebSocket from 'ws';
import { SocketMessage } from './types';

const ratings = {
  sendRatingsOne: (client: WebSocket) => {
    const json: SocketMessage = {
      headers:{
        method:"/game/sendRatingsOne",
        id:12403518
      },
      body:{      
        "leaderboard": {         
          "brewery":[            
            {               
              "rank":1,
              "name":"Друзь",
              "points":8823.75            
            },
            {               
              "rank":20,               
              "name":"ФёдорДвинятин",               
              "points":5294.25            
            }         
          ],         
          "overall":[            
            {               
              "rank":1,               
              "name":"Друзь",               
              "points":8823.75            
            },            
            {               
              "rank":20,               
              "name":"МаксимПоташёв",               
              "points":7920.15            
            }         
          ],         
          "breweries":[            
            {               
              "rank":1,               
              "name":"Пивбар#1",               
              "points":7941.38            
            },            
            {               
              "rank":20,
              "name":"Краснаямельница",               
              "points":7238.12            
            }         
          ]      
        }   
      }
    }
    const request = JSON.stringify(json);
    console.log('Send to client request: %s', request);
    client.send(request)
  },
  sendRatingsTwo: (client: WebSocket) => {
    const json: SocketMessage = {
      headers:{
        method:"/game/sendRatingsTwo",
        id:12403518
      },
      body:{      
        "leaderboard":{         
          "month":[            
            {              
              "rank":1,
              "name":"Друзь",               
              "points":37059.75            
            },            
            {               
              "rank":20,
              "name":"ИльяНовиков",               
              "points":35294.00            
            }         
          ],         
          "overall":[            
            {               
              "rank":1,               
              "name":"Друзь",               
              "points":74200.00            
            },            
            {               
              "rank":20,               
              "name":"Самыйумный",               
              "points":69201.30            
            }         
          ]      
        }
      }
    }
    const request = JSON.stringify(json);
    console.log('Send to client request: %s', request);
    client.send(request)
  }
}

export default ratings;
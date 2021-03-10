const game = {
  getTime: () => {
    return {
      "time":"19:00:00"
    }
  },
  getSettings: () => {
    return {
      "settings": [
        {"name":"DISTANCE_GAMEOVER", "value": 40},
        {"name":"DISTANCE_WARNING", "value": 30},
      ]
    }
  }
}

export default game;
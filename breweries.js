module.exports = {
  getBreweryListResponse: () => {
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
}

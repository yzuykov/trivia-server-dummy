const breweries = {
  getBreweryListResponse: () => {
    return {
      'breweries': [
          {
              "id": 777,
              "name": "Пивбар #1",
              "address": "Москва, Лужнецкая набережная, 1",
              "coordinates": "55.755831,37.617673",
              "tz": "UTC+3:00",
              "photo_url": "https://media-cdn.tripadvisor.com/media/photo-s/17/75/d7/11/rush-bar.jpg"
          },
          {
              "id": 123,
              "name": "Пивград",
              "address": "Санкт-Петербург, Невский проспект, 45",
              "coordinates": "59.930534,30.348926",
              "tz": "UTC+3:00",
              "photo_url": "https://media-cdn.tripadvisor.com/media/photo-s/17/75/d7/11/rush-bar.jpg"
          },
          {
              "id": 1,
              "name": "Офис Вингс",
              "address": "Владимир, пр-т Ленина, 38",
              "coordinates": "56.119639, 40.361054",
              "tz": "UTC+3:00",
              "photo_url": "https://media-cdn.tripadvisor.com/media/photo-s/17/75/d7/11/rush-bar.jpg"
          }
      ]
    }
  }
}

export default breweries;

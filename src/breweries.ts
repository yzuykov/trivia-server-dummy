const breweries = {
  getBreweryListResponse: () => {
    return {
      'breweries': [
          {
              "id": 1,
              "name": "Local Station Bar",
              "address": "Москва, Лазоревый пр., 1А, корп. 1",
              "coordinates": "55.847830,37.639557",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/local_station_bar.png"
          },
          {
              "id": 2,
              "name": "Harats Pub Белорусская",
              "address": "Москва, 1-я Тверская-Ямская ул., 27",
              "coordinates": "55.775788,37.585592",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/harats_pub_belarus.png"
          },
          {
              "id": 3,
              "name": "Dogma Bottle Shop",
              "address": "Москва, Большой Спасоглинищевский пер., 9/1с10",
              "coordinates": "55.754973, 37.637272",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/dogma_bottle_shop.png"
          },
          {
              "id": 4,
              "name": "Vолчья Sтая",
              "address": "Москва, Мясницкая ул., 38, стр. 1",
              "coordinates": "55.766142, 37.640030",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/volf_staya.png"
          },
          {
              "id": 5,
              "name": "Craft Republic",
              "address": "Москва, Малый Гнездниковский пер., 9, стр. 7",
              "coordinates": "55.762658, 37.606356",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/craft_republic.png"
          },
          {
              "id": 6,
              "name": "PIVBAR Маяковская",
              "address": "Москва, 1-я Тверская-Ямская ул., 2, стр. 1",
              "coordinates": "55.770308, 37.597225",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/pivbar_mayak.png"
          },
          {
              "id": 7,
              "name": "Redrum",
              "address": "Санкт-Петербург, Центральный район, ул. Некрасова, 26",
              "coordinates": "59.938946, 30.356956",
              "tz": "UTC+3:00",
              "photo_url": "https://zabbix.wsoft.ru/distrs/breweries/redrum.png"
          },
          {
              "id": 0,
              "name": "Офис Вингс",
              "address": "Владимир, пр-т Ленина, 38",
              "coordinates": "56.119573, 40.360769",
              "tz": "UTC+3:00",
              "photo_url": "https://media-cdn.tripadvisor.com/media/photo-s/17/75/d7/11/rush-bar.jpg"
          }
      ]
    }
  }
}

export default breweries;

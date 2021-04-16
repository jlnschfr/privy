<template>
  <div v-if="active">
    <div class="w-full">{{ city }}</div>
    <div v-if="temperature !== ''" class="flex items-center mt-2">
      <component :is="icon" class="fill-current w-6" />
      <div>
        <p class="text-2xl leading-none">{{ Math.round(temperature) }}°</p>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    CloudlyGustsIcon: () => import('@/assets/svg/weather/wi-cloudy-gusts.svg'),
    CloudlyIcon: () => import('@/assets/svg/weather/wi-cloudy.svg'),
    DaySunnyOvercastIcon: () =>
      import('@/assets/svg/weather/wi-day-sunny-overcast.svg'),
    DaySunnyIcon: () => import('@/assets/svg/weather/wi-day-sunny.svg'),
    FogIcon: () => import('@/assets/svg/weather/wi-fog.svg'),
    HailIcon: () => import('@/assets/svg/weather/wi-hail.svg'),
    NightClearIcon: () => import('@/assets/svg/weather/wi-night-clear.svg'),
    NightCloudyIcon: () => import('@/assets/svg/weather/wi-night-cloudy.svg'),
    RainIcon: () => import('@/assets/svg/weather/wi-rain.svg'),
    SleetIcon: () => import('@/assets/svg/weather/wi-sleet.svg'),
    SnowIcon: () => import('@/assets/svg/weather/wi-snow.svg'),
    SprinkleIcon: () => import('@/assets/svg/weather/wi-sprinkle.svg'),
    ThunderstormIcon: () => import('@/assets/svg/weather/wi-thunderstorm.svg'),
  },
  data() {
    return {
      temperature: '',
      city: '',
      description: '',
      icon: '',
      active: false,
    }
  },
  mounted() {
    this.interval = setInterval(this.checkWeather.bind(this), 300000)
    this.checkWeather()
  },

  destroyed() {
    clearInterval(this.interval)
  },

  methods: {
    async checkWeather() {
      // check if stored weather is not older then 0.5 hours
      const location = this.$store.getters.getLocation()
      const weather = this.$store.getters.getWeather()
      const offset = 1800000

      if (
        location &&
        weather &&
        weather.date?.getTime() + offset > new Date()
      ) {
        this.applyLocationAndWeather(location, weather.data)
      } else {
        try {
          const location = await this.getLocation()
          const weather = await this.getWeather(location.lat, location.lon)

          this.$store.dispatch('setLocation', location)
          this.$store.dispatch('setWeather', weather)

          this.applyLocationAndWeather(location, weather)
        } catch (err) {
          // console.log(err)
        }
      }
    },

    getLocation() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          reject(new Error("Browser doesn't support Geolocation API"))
        } else {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const lat = position.coords.latitude
              const lon = position.coords.longitude
              const city = await this.getCity(lat, lon)
              resolve({ lat, lon, city })
            },
            () => {
              reject(new Error("Browser doesn't support Geolocation API"))
            }
          )
        }
      })
    },

    getCity(lat, lon) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const url = new URL('https://nominatim.openstreetmap.org/reverse')
        url.searchParams.set('format', 'json')
        url.searchParams.set('lat', lat)
        url.searchParams.set('lon', lon)
        const response = await fetch(url)
        if (response.ok) {
          const json = await response.json()
          resolve(`${json.address?.city}, ${json.address?.country}`)
        } else {
          reject(new Error("Can't fetch Location Data"))
        }
      })
    },

    getWeather(lat, lon) {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        const url = new URL('https://api.climacell.co/v3/weather/realtime')
        url.searchParams.set('unit_system', 'si')
        url.searchParams.set('apikey', 'Kp2il3y21251KTFaYzh82Dmq63h6YmTW')
        url.searchParams.set('lat', lat)
        url.searchParams.set('lon', lon)
        url.searchParams.set('fields', 'temp,weather_code,sunset')
        const response = await fetch(url)
        if (response.ok) {
          const json = await response.json()
          resolve(json)
        } else {
          reject(new Error("Can't fetch Weather Data"))
        }
      })
    },

    applyLocationAndWeather(location, weather) {
      const isNight = new Date(weather.sunset.value) < new Date()
      const iconMap = this.generateIconMap(isNight)

      this.temperature = weather.temp.value
      this.description = weather.weather_code.value.replace('_', ' ')
      this.icon = iconMap[weather.weather_code.value]
      this.city = location.city
      this.active = true
    },

    generateIconMap(isNight) {
      return {
        freezing_rain_heavy: 'SleetIcon',
        freezing_rain: 'SleetIcon',
        freezing_rain_light: 'SleetIcon',
        freezing_drizzle: 'SleetIcon',
        ice_pellets_heavy: 'HailIcon',
        ice_pellets: 'HailIcon',
        ice_pellets_light: 'HailIcon',
        snow_heavy: 'SnowIcon',
        snow: 'SnowIcon',
        snow_light: 'SnowIcon',
        flurries: 'CloudlyGustsIcon',
        tstorm: 'ThunderstormIcon',
        rain_heavy: 'RainIcon',
        rain: 'RainIcon',
        rain_light: 'RainIcon',
        drizzle: 'SprinkleIcon',
        fog_light: 'FogIcon',
        fog: 'FogIcon',
        cloudy: 'CloudlyIcon',
        mostly_cloudy: 'CloudlyIcon',
        partly_cloudy: 'CloudlyIcon',
        mostly_clear: 'CloudlyIcon',
        clear: isNight ? 'NightClearIcon' : 'DaySunnyIcon',
      }
    },
  },
}
</script>

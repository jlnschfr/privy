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
import CloudlyGustsIcon from '@/assets/svg/weather/wi-cloudy-gusts.svg'
import CloudlyIcon from '@/assets/svg/weather/wi-cloudy.svg'
import DaySunnyOvercastIcon from '@/assets/svg/weather/wi-day-sunny-overcast.svg'
import DaySunnyIcon from '@/assets/svg/weather/wi-day-sunny.svg'
import FogIcon from '@/assets/svg/weather/wi-fog.svg'
import HailIcon from '@/assets/svg/weather/wi-hail.svg'
import NightClearIcon from '@/assets/svg/weather/wi-night-clear.svg'
import NightCloudyIcon from '@/assets/svg/weather/wi-night-cloudy.svg'
import RainIcon from '@/assets/svg/weather/wi-rain.svg'
import SleetIcon from '@/assets/svg/weather/wi-sleet.svg'
import SnowIcon from '@/assets/svg/weather/wi-snow.svg'
import SprinkleIcon from '@/assets/svg/weather/wi-sprinkle.svg'
import ThunderstormIcon from '@/assets/svg/weather/wi-thunderstorm.svg'

export default {
  components: {
    CloudlyGustsIcon,
    CloudlyIcon,
    DaySunnyOvercastIcon,
    DaySunnyIcon,
    FogIcon,
    HailIcon,
    NightClearIcon,
    NightCloudyIcon,
    RainIcon,
    SleetIcon,
    SnowIcon,
    SprinkleIcon,
    ThunderstormIcon
  },
  data() {
    return {
      temperature: '',
      city: '',
      description: '',
      icon: '',
      active: false
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
        clear: isNight ? 'NightClearIcon' : 'DaySunnyIcon'
      }
    }
  }
}
</script>

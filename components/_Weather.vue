<template>
  <div>
    <div class="w-full">{{ location }}</div>
    <div class="flex items-center mt-2">
      <component :is="icon" class="fill-current w-7" />
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
      temperature: 0,
      location: '',
      description: '',
      icon: '',
      iconMap: {
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
        partly_cloudy: 'DaySunnyOvercastIcon',
        mostly_clear: 'DaySunnyOvercastIcon',
        clear: 'DaySunnyIcon'
      }
    }
  },
  mounted() {
    this.getLocation()
    // TODO: init api interval
  },

  destroyed() {
    // TODO: destroy api interval
  },

  methods: {
    async getLocation() {
      const url = new URL('https://geolocation-db.com/json/')
      const response = await fetch(url)
      if (response.ok) {
        const json = await response.json()
        const lat = json.latitude
        const lon = json.longitude
        this.location = `${json.city}, ${json.country_name}`
        this.getWeather(lat, lon)
      }
    },
    async getWeather(lat, lon) {
      const url = new URL('https://api.climacell.co/v3/weather/realtime')
      url.searchParams.set('unit_system', 'si')
      url.searchParams.set('apikey', 'Kp2il3y21251KTFaYzh82Dmq63h6YmTW')
      url.searchParams.set('lat', lat)
      url.searchParams.set('lon', lon)
      url.searchParams.set('fields', 'temp,weather_code,sunset')
      const response = await fetch(url)
      if (response.ok) {
        const json = await response.json()
        // TODO: make icon map computed property
        this.icon = this.iconMap[json.weather_code.value]
        this.isNight = new Date(json.sunset.value) < new Date()
        this.temperature = json.temp.value
        this.description = json.weather_code.value.replace('_', ' ')
      }
    }
  }
}
</script>

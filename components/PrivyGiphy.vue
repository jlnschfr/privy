<template>
  <img class="Giphy" :src="src" />
</template>

<script>
export default {
  data() {
    return {
      src: '',
    }
  },
  mounted() {
    this.getGiphy()
  },

  methods: {
    async getGiphy(lat, lon) {
      const url = new URL('https://api.giphy.com/v1/gifs/random')
      url.searchParams.set('api_key', 'l02EriFfWYg8R3ROtWLKmWtEBfIZG9cU')
      url.searchParams.set('tag', 'scrambled eggs')
      const response = await fetch(url)
      if (response.ok) {
        const json = await response.json()
        this.src = json.data.image_url
        console.log(json)
      } else {
        // new Error("Can't fetch Giphy Data")
      }
    },
  },
}
</script>

<style scoped>
.Giphy {
  object-fit: cover;
  height: 220px;
  width: 100%;
}
</style>

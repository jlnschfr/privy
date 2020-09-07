<template>
  <nuxt />
</template>

<script>
import { auth } from '@/plugins/firebase.js'

export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.name
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  watch: {
    $route(to, from) {
      this.currentRoute = to.name
    }
  },

  created() {
    this.$store.dispatch('enablePersistence').then(() => {
      this.bindAuthChanged()
    })
  },

  methods: {
    bindAuthChanged() {
      auth.onAuthStateChanged((user) => {
        this.$store.dispatch('handleAuthChanged', user)

        if (this.$store.state.user) {
          if (this.currentRoute === 'index') {
            this.$router.push('/notes')
          }
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

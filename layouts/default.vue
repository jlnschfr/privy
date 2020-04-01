<template>
  <main class="font-body">
    <PrivyHeader :user="user" @logout="logout" />
    <div class="p-4r">
      <nuxt />
    </div>
  </main>
</template>

<script>
import PrivyHeader from '@/components/PrivyHeader'
import { auth } from '@/plugins/firebase.js'

export default {
  components: {
    PrivyHeader
  },

  data() {
    return {
      frequentUpdates: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user
    }
  },

  created() {
    this.bindAuthChanged()
  },

  methods: {
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {})
        .catch(() => {})
    },

    bindAuthChanged() {
      auth.onAuthStateChanged((user) => {
        this.$store.dispatch('handleAuthChanged', user)

        if (this.$store.state.user) {
          if (this.$router.currentRoute.name === 'index') {
            this.$router.push('/notes')
          }
          this.bindFrequentUpdates()
        } else {
          this.$router.push('/')
          this.unbindFrequentUpdates()
        }
      })
    },

    bindFrequentUpdates() {
      if (!this.frequentUpdates) {
        this.frequentUpdates = setInterval(() => {
          this.$store.dispatch('getItems')
        }, 15000)
      }
    },

    unbindFrequentUpdates() {
      if (this.frequentUpdates) {
        clearInterval(this.frequentUpdates)
      }
    }
  }
}
</script>

<style>
html {
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}
</style>

<template>
  <div>
    <header class="flex justify-between items-center bg-gray-100 shadow-lg p-8">
      <h1 class="text-xl font-semibold">Privy</h1>
      <nav v-if="user" class="flex items-center">
        <p class="text-gray-500 mr-3">logged in as {{ user.email }}</p>
        <button
          class="bg-blue-500 text-white px-8 py-2"
          @click.prevent="logout"
        >
          Logout
        </button>
      </nav>
    </header>
    <nuxt />
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase.js'
export default {
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
        .catch((e) => {})
    },

    bindAuthChanged() {
      auth.onAuthStateChanged((user) => {
        this.$store.dispatch('handleAuthChanged', user)

        if (this.$store.state.user) {
          this.$router.push('/notes')
        } else {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>

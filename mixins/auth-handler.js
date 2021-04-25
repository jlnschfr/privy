export default {
  data() {
    return {
      unsubscribe: null,
      currentRoute: this.$router.currentRoute.name,
    }
  },

  watch: {
    $route(to, from) {
      this.currentRoute = to.name
    },
  },

  created() {
    if (!this.$store.getters.getIsPersistent()) {
      this.$store.dispatch('enablePersistence').then(() => {
        this.bindAuthChanged()
      })
    } else {
      this.bindAuthChanged()
    }
  },

  beforeDestroy() {
    this.unsubscribe || this.unsubscribe()
  },

  methods: {
    bindAuthChanged() {
      this.unsubscribe = this.$fire.auth.onAuthStateChanged((user) => {
        this.$store.dispatch('handleAuthChanged', user)

        if (this.$store.getters.getUser()) {
          if (this.currentRoute === 'index') {
            this.$router.push('/notes/')
          }
        } else if (this.currentRoute !== 'index') {
          this.$router.push('/')
        }
      })
    },
  },
}

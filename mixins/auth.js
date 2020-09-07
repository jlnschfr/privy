import { auth } from '@/plugins/firebase.js'

export default {
  data() {
    return {
      unsubscribe: null,
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
    if (this.$store.state.persistence) {
      this.$store.dispatch('enablePersistence').then(() => {
        this.bindAuthChanged()
      })
    } else {
      this.bindAuthChanged()
    }
  },

  beforeDestroy() {
    console.log(this.unsubscribe)
    this.unsubscribe()
  },

  methods: {
    bindAuthChanged() {
      this.unsubscribe = auth.onAuthStateChanged((user) => {
        this.$store.dispatch('handleAuthChanged', user)

        console.log(this.currentRoute)

        if (this.$store.state.user) {
          if (this.currentRoute === 'index') {
            console.log('user and redirecting to notes')
            this.$router.push('/notes')
          } else {
            console.log('user')
          }
        } else if (this.currentRoute !== 'index') {
          console.log('no user and redirecting to index')
          this.$router.push('/')
        } else {
          console.log('no user')
        }
      })
    }
  }
}

<template>
  <main class="font-body">
    <PrivyHeader :user="user" @toggleDrawer="showDrawer = !showDrawer" />
    <PrivyDrawer
      :is-active="showDrawer"
      :user="user"
      :items="items"
      @logout="logout"
      @toggleDrawer="showDrawer = !showDrawer"
    />
    <div class="p-4r">
      <nuxt />
    </div>
  </main>
</template>

<script>
import PrivyHeader from '@/components/PrivyHeader'
import PrivyDrawer from '@/components/PrivyDrawer'
import { auth } from '@/plugins/firebase.js'

export default {
  components: {
    PrivyHeader,
    PrivyDrawer
  },

  data() {
    return {
      frequentUpdates: false,
      showDrawer: false
    }
  },

  computed: {
    user() {
      return this.$store.state.user ? this.$store.state.user : {}
    },
    items() {
      return this.$store.state.items ? this.$store.state.items : []
    }
  },

  created() {
    this.$store.dispatch('enablePersistence').then(() => {
      this.bindAuthChanged()
    })
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
          if (navigator.onLine) {
            this.$store.dispatch('getItems')
          }
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

.slide-enter-active,
.slide-leave-active,
.slide-right-enter-active,
.slide-right-leave-active,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.slide-enter {
  transform: translateY(-1rem);
  opacity: 0;
}

.slide-enter-to,
.slide-leave {
  transform: translateY(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateY(1rem);
  opacity: 0;
}

.slide-right-enter {
  transform: translateX(100%);
}

.slide-right-enter-to,
.slide-right-leave {
  transform: translateY(0);
}

.slide-right-leave-to {
  transform: translateX(100%);
}

.fade-enter {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-leave-to {
  opacity: 0;
}
</style>

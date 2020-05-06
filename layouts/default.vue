<template>
  <div class="font-body bg-pgray-background min-h-screen">
    <PrivyHeader :user="user" @toggleDrawer="showDrawer = !showDrawer" />
    <PrivyDrawer
      :is-active="showDrawer"
      :user="user"
      :notes="notes"
      @logout="logout"
      @toggleDrawer="showDrawer = !showDrawer"
    />
    <main class="p-4r relative">
      <Spinner :is-active="isFetchingNotes" />
      <nuxt />
    </main>
    <PrivyAddButton :is-active="showButton" />
  </div>
</template>

<script>
import PrivyHeader from '@/components/PrivyHeader'
import PrivyDrawer from '@/components/PrivyDrawer'
import PrivyAddButton from '@/components/PrivyAddButton'
import Spinner from '@/components/_Spinner'
import { auth } from '@/plugins/firebase.js'

export default {
  components: {
    PrivyHeader,
    PrivyDrawer,
    PrivyAddButton,
    Spinner
  },

  data() {
    return {
      frequentUpdates: false,
      showDrawer: false,
      currentRoute: this.$router.currentRoute.name,
      isIdle: false
    }
  },

  computed: {
    isFetchingNotes() {
      return this.$store.state.isFetchingNotes
    },
    user() {
      return this.$store.state.user
    },
    notes() {
      return this.$store.getters.getNotes()
    },
    showButton() {
      return this.currentRoute === 'notes'
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

  onIdle() {
    this.isIdle = true
  },

  onActive() {
    this.isIdle = false
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
          if (this.currentRoute === 'index') {
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
            if (
              !this.isIdle ||
              document.activeElement.tagName.toUpperCase() === 'INPUT' ||
              document.activeElement.tagName.toUpperCase() === 'TEXTAREA' ||
              document.activeElement.closest('.ProseMirror')
            ) {
              return
            }
            this.$store.dispatch('getNotes')
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

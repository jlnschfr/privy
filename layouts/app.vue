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
    // move to component
    logout() {
      this.$store
        .dispatch('logout')
        .then(() => {})
        .catch(() => {})
    },

    // shareable across all layouts?
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

<template>
  <div class="font-body bg-pgray-background min-h-screen">
    <PrivyHeader :user="user" @toggleDrawer="showDrawer = !showDrawer" />
    <PrivyDrawer
      :is-active="showDrawer"
      :user="user"
      :notes="notes"
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
import auth from '@/mixins/auth.js'
import PrivyHeader from '@/components/PrivyHeader'
import PrivyDrawer from '@/components/PrivyDrawer'
import PrivyAddButton from '@/components/PrivyAddButton'
import Spinner from '@/components/_Spinner'

export default {
  components: {
    PrivyHeader,
    PrivyDrawer,
    PrivyAddButton,
    Spinner
  },
  mixins: [auth],

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

  mounted() {
    this.bindFrequentUpdates()
  },

  destroyed() {
    this.unbindFrequentUpdates()
  },

  onIdle() {
    this.isIdle = true
  },

  onActive() {
    this.isIdle = false
  },

  methods: {
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

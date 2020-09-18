<template>
  <div
    class="font-body font-normal text-neutral-200 bg-neutral-500 min-h-screen"
  >
    <PrivyHeader
      :user="user"
      :notes="notes"
      :is-fetching-notes="isFetchingNotes"
      @toggle-drawer="showDrawer = !showDrawer"
    />
    <PrivyDrawer
      :is-active="showDrawer"
      @toggle-drawer="showDrawer = !showDrawer"
    />
    <main class="p-4vw md:pl-app relative">
      <Spinner
        :is-active="isFetchingNotes || !(notes && user)"
        class="hidden md:block fixed bottom-2vw"
      />
      <nuxt v-if="notes && user" />
    </main>
    <PrivyAddButton :is-active="showButton" />
    <PrivySnackbar />
  </div>
</template>

<script>
import AuthHandler from '@/mixins/auth-handler.js'
import ContentUpdater from '@/mixins/content-updater.js'
import PrivyHeader from '@/components/PrivyHeader'
import PrivyDrawer from '@/components/PrivyDrawer'
import PrivyAddButton from '@/components/PrivyAddButton'
import PrivySnackbar from '@/components/PrivySnackbar'
import Spinner from '@/components/_Spinner'

export default {
  name: 'App',
  components: {
    PrivyHeader,
    PrivyDrawer,
    PrivyAddButton,
    PrivySnackbar,
    Spinner
  },
  mixins: [AuthHandler, ContentUpdater],

  data() {
    return {
      showDrawer: false,
      currentRoute: this.$router.currentRoute.name
    }
  },

  computed: {
    isFetchingNotes() {
      return this.$store.getters.getIsFetchingNotes()
    },
    user() {
      return this.$store.getters.getUser()
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
  }
}
</script>

<style>
@import './../assets/css/transitions';
@import './../assets/css/animations';
</style>

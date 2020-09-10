<template>
  <div
    class="font-body font-normal text-neutral-200 bg-neutral-500 min-h-screen"
  >
    <PrivyHeader :user="user" @toggle-drawer="showDrawer = !showDrawer" />
    <PrivyDrawer
      :is-active="showDrawer"
      :user="user"
      :notes="notes"
      @toggle-drawer="showDrawer = !showDrawer"
    />
    <main class="p-4r relative">
      <Spinner :is-active="isFetchingNotes || !(notes && user)" />
      <nuxt v-if="notes && user" />
    </main>
    <PrivyAddButton :is-active="showButton" />
  </div>
</template>

<script>
import AuthHanlder from '@/mixins/auth-handler.js'
import ContentUpdater from '@/mixins/content-updater.js'
import PrivyHeader from '@/components/PrivyHeader'
import PrivyDrawer from '@/components/PrivyDrawer'
import PrivyAddButton from '@/components/PrivyAddButton'
import Spinner from '@/components/_Spinner'

export default {
  name: 'App',
  components: {
    PrivyHeader,
    PrivyDrawer,
    PrivyAddButton,
    Spinner
  },
  mixins: [AuthHanlder, ContentUpdater],

  data() {
    return {
      showDrawer: false,
      currentRoute: this.$router.currentRoute.name
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
  }
}
</script>

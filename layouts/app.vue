<template>
  <div
    class="font-body font-normal text-neutral-200 bg-neutral-500 dark:text-neutral-400 dark:bg-neutral-50 min-h-screen transition duration-300"
  >
    <PrivyHeader
      :user="user"
      :notes="notes"
      :is-syncing="isSyncing"
      @toggle-drawer="showDrawer = !showDrawer"
    />
    <PrivyDrawer
      :is-active="showDrawer"
      @toggle-drawer="showDrawer = !showDrawer"
    />
    <main class="p-4vw md:pl-app relative">
      <Spinner
        :is-active="isSyncing || !(notes && user)"
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
import TagHandler from '@/mixins/tag-handler.js'

export default {
  name: 'App',
  components: {
    PrivyHeader,
    PrivyDrawer,
    PrivyAddButton,
    PrivySnackbar,
    Spinner
  },
  mixins: [AuthHandler, ContentUpdater, TagHandler],

  data() {
    return {
      showDrawer: false,
      currentRoute: this.$router.currentRoute.name
    }
  },

  computed: {
    isSyncing() {
      return this.$store.getters.getIsSyncing()
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
.slide-enter-active,
.slide-leave-active,
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

@media (max-width: 1023px) {
  .mobile-slide-right-enter {
    transform: translateX(100%);
  }

  .mobile-slide-right-enter-to,
  .mobile-slide-right-leave {
    transform: translateY(0);
  }

  .mobile-slide-right-leave-to {
    transform: translateX(100%);
  }

  .mobile-slide-right-enter-active,
  .mobile-slide-right-leave-active {
    transition: all 0.3s;
  }
}
</style>

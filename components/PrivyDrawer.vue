<template>
  <section>
    <transition name="mobile-slide-right">
      <div
        v-if="isActive || !isMobile"
        class="w-4/5 md:max-w-drawer fixed top-0 right-0 md:left-0 z-50 bg-neutral-100 h-full text-neutral-300 flex flex-col justify-between py-4"
      >
        <div>
          <header class="px-4 text-center">
            <p class="flex justify-center">
              <PrivyLogo width="5" />
            </p>
          </header>
          <nav class="px-6 mt-4 overflow-auto max-h-drawerNav">
            <ul class="w-full">
              <li>
                <nuxt-link
                  to="/notes/"
                  class="flex items-center"
                  :class="{ 'text-neutral-600': currentTag === '' }"
                >
                  <GridIcon class="w-2 mr-1" /> Notes
                </nuxt-link>
              </li>
              <li class="mt-2">
                <nuxt-link
                  to="/notes/?tag=trash"
                  class="flex items-center"
                  :class="{ 'text-neutral-600': currentTag === 'trash' }"
                >
                  <TrashIcon class="w-2 mr-1" /> Trash
                </nuxt-link>
              </li>

              <li v-for="(tag, key) in reducedTags" :key="key" class="mt-2">
                <div class="flex justify-between">
                  <nuxt-link
                    :to="`/notes/?tag=${tag}`"
                    class="flex items-center"
                    :class="{ 'text-neutral-600': tag === currentTag }"
                  >
                    <HashIcon class="w-2 mr-1" /> {{ tag }}
                  </nuxt-link>
                  {{ getTagAmount(tag) }}
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <footer class="px-6 mt-4">
          <ul class="w-full">
            <li><Weather /></li>
            <li class="mt-2">
              <button class="flex items-center" @click="toggleDarkMode()">
                <span v-if="isDarkMode" class="flex"
                  ><SunIcon class="w-2 mr-1" /> Light Mode</span
                >
                <span v-if="!isDarkMode" class="flex"
                  ><MoonIcon class="w-2 mr-1" /> Dark Mode</span
                >
              </button>
            </li>
            <li class="mt-2">
              <button
                class="flex items-center"
                @click="$store.dispatch('logout')"
              >
                <LogoutIcon class="w-2 mr-1" /> Logout
              </button>
            </li>
          </ul>
        </footer>
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="isActive"
        class="bg-neutral-200 bg-opacity-75 w-screen h-screen fixed top-0 left-0 z-40"
        @click="$emit('toggle-drawer')"
      ></div>
    </transition>
  </section>
</template>

<script>
import GridIcon from '@/assets/svg/grid.svg'
import HashIcon from '@/assets/svg/hash.svg'
import LogoutIcon from '@/assets/svg/logout.svg'
import MoonIcon from '@/assets/svg/moon.svg'
import PrivyLogo from '@/components/PrivyLogo'
import SunIcon from '@/assets/svg/sun.svg'
import TrashIcon from '@/assets/svg/trash.svg'
import ViewportHandler from '@/mixins/viewport-handler.js'
import Weather from '@/components/_Weather'

export default {
  components: {
    GridIcon,
    HashIcon,
    LogoutIcon,
    MoonIcon,
    PrivyLogo,
    SunIcon,
    TrashIcon,
    Weather
  },
  mixins: [ViewportHandler],
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    currentTag() {
      return this.$store.getters.getCurrentTag()
    },
    reducedTags() {
      return this.$store.getters.getReducedTags()
    },
    isDarkMode() {
      return this.$colorMode.value !== 'light'
    }
  },

  watch: {
    $route(to, from) {
      if (this.isActive && this.isMobile) {
        this.$emit('toggle-drawer')
      }
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('logout')
    },
    getTagAmount(tag) {
      return this.$store.getters.getTagAmount(tag)
    },
    toggleDarkMode() {
      this.$colorMode.preference = this.isDarkMode ? 'light' : 'dark'
    }
  }
}
</script>

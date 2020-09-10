<template>
  <section>
    <transition name="slide-right">
      <aside
        v-if="isActive || !isMobile"
        class="w-4/5 sm:max-w-drawer fixed top-0 right-0 sm:left-0 z-50 bg-neutral-100 h-full text-neutral-300 flex flex-col justify-between"
      >
        <div>
          <header class="p-4 text-center">
            <p class="flex justify-center">
              <PrivyIcon ref="svg" class="w-5" />
            </p>
          </header>
          <nav class="px-6 overflow-auto max-h-drawerNav">
            <ul class="w-full">
              <li>
                <nuxt-link to="notes" class="flex items-center">
                  <GridIcon class="w-2 mr-1" /> Notes
                </nuxt-link>
              </li>
              <li class="mt-2">
                <nuxt-link to="notes?tag=trash" class="flex items-center">
                  <TrashIcon class="w-2 mr-1" /> Trash
                </nuxt-link>
              </li>

              <li v-for="(tag, key) in reducedTags" :key="key" class="mt-2">
                <div class="flex justify-between">
                  <nuxt-link
                    :to="`notes?tag=${tag}`"
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
        <footer class="px-6 py-4">
          <ul class="w-full">
            <li>Weather</li>
            <li class="mt-2">
              <button class="flex items-center">
                <SunIcon class="w-2 mr-1" /> Light Mode
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
      </aside>
    </transition>
    <transition name="fade">
      <div
        v-if="isActive"
        class="bg-neutral-300 w-screen h-screen fixed top-0 left-0 z-40"
        @click="$emit('toggle-drawer')"
      ></div>
    </transition>
  </section>
</template>

<script>
import PrivyIcon from '@/assets/svg/privy.svg'
import LogoutIcon from '@/assets/svg/logout.svg'
import GridIcon from '@/assets/svg/grid.svg'
import HashIcon from '@/assets/svg/hash.svg'
import TrashIcon from '@/assets/svg/trash.svg'
import SunIcon from '@/assets/svg/sun.svg'
import ViewportHandler from '@/mixins/viewport-handler.js'
import LogoAnimator from '@/mixins/logo-animator.js'

export default {
  components: {
    PrivyIcon,
    LogoutIcon,
    TrashIcon,
    GridIcon,
    HashIcon,
    SunIcon
  },
  mixins: [ViewportHandler, LogoAnimator],
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: () => {}
    },
    notes: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    currentTag() {
      return this.$store.getters.getCurrentTag()
    },
    notesNotTrashed() {
      return this.notes.filter(
        (note) => !note.tags.some((tag) => tag.text === 'Trash')
      )
    },
    availableTags() {
      return this.notesNotTrashed
        .flatMap((note) => note.tags)
        .map((note) => note.text)
    },
    reducedTags() {
      return this.availableTags
        .filter((note, pos, arr) => arr.indexOf(note) === pos)
        .sort()
    }
  },

  methods: {
    getTagAmount(currentTag) {
      if (currentTag) {
        return this.availableTags.filter((note) => note === currentTag).length
      } else {
        return this.notesNotTrashed.length
      }
    },
    logout() {
      this.$store.dispatch('logout')
    }
  }
}
</script>

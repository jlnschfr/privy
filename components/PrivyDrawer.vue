<template>
  <section>
    <transition name="slide-right">
      <aside
        v-if="isActive"
        class="w-4/5 sm:min-w-drawer sm:w-auto fixed top-0 right-0 z-50 bg-white h-full text-pblue-medium flex flex-col justify-between"
      >
        <div class="">
          <header class="p-6 border-b border-pblue-light text-center">
            <p class="flex justify-center">
              <PrivyIcon ref="svg" class="fill-blue w-4" />
            </p>
            <p class="text-2xl mt-2">{{ user.email }}</p>
            <p>
              <span class="mr-2">{{ notes.length }} notes</span>
              <span>{{ tasksAmount }} tasks</span>
            </p>
          </header>
          <nav class="p-6 flex justify-center overflow-auto max-h-drawerNav">
            <ul>
              <li @click="$emit('toggleDrawer')">
                <Button type="nuxt-link" to="notes" class="flex items-center"
                  ><span
                    class="mr-2 bg-pblue-dark text-white rounded-full h-3 w-3 flex items-center justify-center"
                    >{{ getTagAmount() }}</span
                  >All</Button
                >
              </li>

              <li
                v-for="(tag, key) in reducedTags"
                :key="key"
                class="mt-4 last:mb-6"
                @click="$emit('toggleDrawer')"
              >
                <Button
                  type="nuxt-link"
                  :to="`notes?tag=${tag}`"
                  class="flex items-center"
                  :class="{ 'text-porange-dark': tag === currentTag }"
                >
                  <span
                    class="mr-2 bg-pblue-dark text-white rounded-full h-3 w-3 flex items-center justify-center"
                    :class="{
                      'bg-porange-dark': tag === currentTag
                    }"
                    >{{ getTagAmount(tag) }}</span
                  >{{ tag }}
                </Button>
              </li>
            </ul>
          </nav>
        </div>
        <footer>
          <ul>
            <li
              class="px-6 py-3 border-t border-pblue-light flex items-center justify-center"
              @click="$emit('toggleDrawer')"
            >
              <Button
                type="nuxt-link"
                to="notes?tag=trash"
                class="flex items-center"
              >
                <TrashIcon class="mr-2 w-2 fill-current" /> Trash
              </Button>
            </li>
            <li
              class="px-6 py-3 border-t border-pblue-light flex items-center justify-center"
            >
              <Button
                type="button"
                class="flex items-center"
                @click="
                  $emit('logout')
                  $emit('toggleDrawer')
                "
              >
                <LogoutIcon class="mr-2 w-2 fill-current" /> Logout
              </Button>
            </li>
          </ul>
        </footer>
      </aside>
    </transition>
    <transition name="fade">
      <div
        v-if="isActive"
        class="bg-pgray-drawer w-screen h-screen fixed top-0 left-0 z-40"
        @click="$emit('toggleDrawer')"
      ></div>
    </transition>
  </section>
</template>

<script>
import Button from '@/components/_Button'
import PrivyIcon from '@/assets/svg/privy.svg'
import LogoutIcon from '@/assets/svg/logout.svg'
import TrashIcon from '@/assets/svg/trash.svg'

export default {
  components: {
    Button,
    PrivyIcon,
    LogoutIcon,
    TrashIcon
  },
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
    tasksAmount() {
      return this.notesNotTrashed.reduce(
        (acc, cur) =>
          acc + cur.items.filter((item) => item.type === 'Task').length,
        0
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
    }
  }
}
</script>

<style>
.fill-blue path {
  fill: theme('colors.pblue.dark') !important;
}
</style>

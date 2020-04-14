<template>
  <div class="relative">
    <StaggeredTransition
      class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4r xl:gap-2r pb-4r md:pb-0 items-center"
    >
      <PrivyNoteTeaser
        v-for="(item, key) in items"
        :key="key"
        :item="item"
        :data-index="key"
      />
    </StaggeredTransition>

    <transition name="fade">
      <div
        v-if="items.length === 0 && !isFetchingItems"
        class="absolute top-4r text-center w-full"
      >
        <h3 class="text-3xl mt-4">Sorry! I can't find any notes</h3>
        <nuxt-link to="note">create a new note</nuxt-link> or
        <nuxt-link to="notes">reset your filter</nuxt-link>
      </div>
    </transition>
  </div>
</template>

<script>
import PrivyNoteTeaser from '@/components/PrivyNoteTeaser'
import StaggeredTransition from '@/components/_StaggeredTransition'
import debounce from 'lodash.debounce'

export default {
  components: {
    PrivyNoteTeaser,
    StaggeredTransition
  },

  props: {
    items: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    isFetchingItems() {
      return this.$store.state.isFetchingItems
    }
  },

  mounted() {
    this.keyHandler = debounce(this.addNote, 150)
    window.addEventListener('keyup', this.keyHandler)
  },

  destroyed() {
    window.removeEventListener('keyup', this.keyHandler)
  },

  methods: {
    addNote(key) {
      if (key.keyCode === 13) {
        this.$router.push(`/notes`)
      }
    }
  }
}
</script>

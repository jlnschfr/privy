<template>
  <div class="relative">
    <StaggeredTransition
      class="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4r xl:gap-2r pb-4r md:pb-0 items-center mb-6"
    >
      <PrivyNoteTeaser
        v-for="(note, key) in notes"
        :key="key"
        :note="note"
        :data-index="key"
      />
    </StaggeredTransition>

    <transition name="fade">
      <div
        v-if="notes.length === 0 && !isFetchingNotes"
        class="absolute top-4r text-center w-full"
      >
        <h3 class="text-3xl mt-4">Sorry! I can't find any notes</h3>
        <Button type="nuxt-link" to="note">create a new note</Button> or
        <Button type="nuxt-link" to="notes">reset your filter</Button>
      </div>
    </transition>
  </div>
</template>

<script>
import debounce from 'lodash.debounce'
import PrivyNoteTeaser from '@/components/PrivyNoteTeaser'
import Button from '@/components/_Button'
import StaggeredTransition from '@/components/_StaggeredTransition'

export default {
  components: {
    PrivyNoteTeaser,
    StaggeredTransition,
    Button
  },

  props: {
    notes: {
      type: Array,
      required: false,
      default: () => []
    }
  },

  computed: {
    isFetchingNotes() {
      return this.$store.getters.getIsFetchingNotes()
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

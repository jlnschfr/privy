<template>
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

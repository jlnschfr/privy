<template>
  <div class="relative">
    <StaggeredTransition
      class="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4vw xl:gap-2vw pb-4vw md:pb-0 items-center mb-6"
    >
      <PrivyNoteTeaser
        v-for="(note, key) in notes"
        :key="key"
        :note="note"
        :data-index="key"
      />
    </StaggeredTransition>
  </div>
</template>

<script>
import PrivyNoteTeaser from '@/components/PrivyNoteTeaser'
import StaggeredTransition from '@/components/_StaggeredTransition'

export default {
  components: {
    PrivyNoteTeaser,
    StaggeredTransition
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
  }
}
</script>

<template>
  <PrivyNoteOverview :notes="filteredNotes" />
</template>

<script>
import PrivyNoteOverview from '@/components/PrivyNoteOverview'

export default {
  layout: 'app',
  transition: 'slide',
  components: {
    PrivyNoteOverview
  },

  computed: {
    currentTag() {
      return this.$store.getters.getCurrentTag()
    },

    filteredNotes() {
      return this.$store.getters.getFilteredNotes(this.currentTag)
    }
  }
}
</script>

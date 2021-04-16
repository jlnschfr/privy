<template>
  <PrivyNoteOverview :notes="filteredNotes" />
</template>

<script>
export default {
  components: {
    PrivyNoteOverview: () => import('@/components/PrivyNoteOverview'),
  },
  layout: 'app',
  transition: 'slide',

  computed: {
    currentTag() {
      return this.$store.getters.getCurrentTag()
    },

    filteredNotes() {
      return this.$store.getters.getFilteredNotes(this.currentTag)
    },
  },
}
</script>

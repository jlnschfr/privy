<template>
  <PrivyNoteOverview :items="filteredItems" />
</template>

<script>
import PrivyNoteOverview from '@/components/PrivyNoteOverview'

export default {
  transition: 'slide',
  components: {
    PrivyNoteOverview
  },

  computed: {
    tag() {
      return this.$route.query.tag ? this.$route.query.tag : ''
    },
    items() {
      return this.$store.state.items ? this.$store.state.items : []
    },
    filteredItems() {
      return this.tag
        ? this.items.filter((item) =>
            item.tags
              ? item.tags.some(
                  (tag) => tag.text.toLowerCase() === this.tag.toLowerCase()
                )
              : false
          )
        : this.items
    }
  }
}
</script>

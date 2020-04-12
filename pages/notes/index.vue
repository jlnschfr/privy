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
      return this.$store.getters.getItems()
    },
    itemsNotTrashed() {
      return this.items.filter(
        (item) => !item.tags.some((tag) => tag.text === 'Trash')
      )
    },
    itemsTrashed() {
      return this.items.filter((item) =>
        item.tags.some((tag) => tag.text === 'Trash')
      )
    },
    filteredItems() {
      if (this.tag === 'trash') {
        return this.itemsTrashed
      } else if (this.tag) {
        return this.getItemsNotTrashedFromTag(this.tag)
      } else {
        return this.itemsNotTrashed
      }
    }
  },

  methods: {
    getItemsNotTrashedFromTag(currentTag) {
      return this.itemsNotTrashed.filter((item) =>
        item.tags.some(
          (tag) => tag.text.toLowerCase() === currentTag.toLowerCase()
        )
      )
    }
  }
}
</script>

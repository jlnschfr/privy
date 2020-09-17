<template>
  <PrivyNoteDetail :id="id" :note="note" />
</template>

<script>
import PrivyNoteDetail from '@/components/PrivyNoteDetail'

export default {
  layout: 'app',
  transition: 'slide',
  components: {
    PrivyNoteDetail
  },

  computed: {
    id() {
      return this.$route.query.id
    },
    note() {
      return this.$store.getters.getNote(this.id)
    }
  }
}
</script>

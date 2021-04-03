<template>
  <PrivyNoteDetail :id="id" :note="note" />
</template>

<script>
import PrivyNoteDetail from '@/components/PrivyNoteDetail'

export default {
  components: {
    PrivyNoteDetail
  },
  layout: 'app',
  transition: 'slide',

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

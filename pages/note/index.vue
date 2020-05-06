<template>
  <PrivyNoteDetail :id="id" :data="data" />
</template>

<script>
import PrivyNoteDetail from '@/components/PrivyNoteDetail'

export default {
  transition: 'slide',
  components: {
    PrivyNoteDetail
  },

  computed: {
    id() {
      return this.$route.query.id
    },
    data() {
      return this.$store.getters.getNote(this.id)
    }
  }
}
</script>

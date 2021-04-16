<template>
  <PrivyNoteDetail :id="id" :note="note" />
</template>

<script>
export default {
  components: {
    PrivyNoteDetail: () => import('@/components/PrivyNoteDetail'),
  },
  layout: 'app',
  transition: 'slide',

  computed: {
    id() {
      return this.$route.query.id
    },
    note() {
      return this.$store.getters.getNote(this.id)
    },
  },
}
</script>

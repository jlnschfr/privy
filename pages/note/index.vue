<template>
  <PrivyDetailForm :id="id" :data="data" />
</template>

<script>
import PrivyDetailForm from '@/components/PrivyDetailForm'

export default {
  transition: 'slide',
  components: {
    PrivyDetailForm
  },

  computed: {
    id() {
      return this.$route.query.id
    },
    data() {
      return this.$store.getters.getItem(this.id)
    }
  }
}
</script>

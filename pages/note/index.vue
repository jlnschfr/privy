<template>
  <PrivyDetailForm :id="id" :data="data" />
</template>

<script>
import PrivyDetailForm from '@/components/PrivyDetailForm'

export default {
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

<template>
  <div>
    <DetailForm :id="id" :data="data" />
  </div>
</template>

<script>
import DetailForm from '@/components/DetailForm'

export default {
  components: {
    DetailForm
  },

  computed: {
    id() {
      return this.$route.params.id
    },
    data() {
      return this.$store.getters.getItem(this.id)
    }
  }
}
</script>

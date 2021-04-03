export default {
  computed: {
    currentTag() {
      return this.$route.query.tag ? this.$route.query.tag : ''
    },
  },
  watch: {
    currentTag() {
      this.$store.dispatch('setCurrentTag', this.currentTag)
    },
  },
  mounted() {
    if (this.currentTag) {
      this.$store.dispatch('setCurrentTag', this.currentTag)
    }
  },
}

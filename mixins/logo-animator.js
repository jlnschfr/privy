export default {
  data() {
    return {
      paths: []
    }
  },

  watch: {
    $route() {
      this.animatePaths()
    }
  },

  mounted() {
    this.paths = this.$refs.svg.$el.querySelectorAll('path')
  },

  methods: {
    animatePaths() {
      this.paths.forEach((path, index) => {
        setTimeout(() => {
          path.classList.add('has-fill-animation')

          setTimeout(() => {
            path.classList.remove('has-fill-animation')
          }, 750)
        }, 100 * index)
      })
    }
  }
}

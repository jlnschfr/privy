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
    this.getPaths()
  },

  methods: {
    getPaths() {
      this.paths = this.$refs.svg?.$el.querySelectorAll('path')
    },

    animatePaths() {
      this.getPaths()

      if (this.paths) {
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
}

import debounce from 'lodash.debounce'

export default {
  data() {
    return {
      isMobile: null,
      resizeHandler: null
    }
  },

  created() {
    this.resizeHandler = debounce(this.handleResize.bind(this), 250)
    window.addEventListener('resize', this.resizeHandler)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    handleResize() {
      this.isMobile = !window.matchMedia('(min-width: 640px)').matches
    }
  }
}

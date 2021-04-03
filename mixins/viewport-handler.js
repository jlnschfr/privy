import debounce from 'lodash.debounce'

export default {
  data() {
    return {
      isMobile: null,
      resizeHandler: null,
    }
  },

  created() {
    this.resizeHandler = debounce(this.handleResize.bind(this), 150)
    window.addEventListener('resize', this.resizeHandler)
    this.handleResize()
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    handleResize() {
      this.isMobile = !window.matchMedia('(min-width: 1024px)').matches
    },
  },
}

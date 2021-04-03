import debounce from 'lodash.debounce'

export default {
  data() {
    return {
      resizeHandler: null,
    }
  },

  mounted() {
    this.resizeHandler = debounce(this.updateTextareaHeight, 500)
    window.addEventListener('resize', this.resizeHandler)
    this.updateTextareaHeight()
  },

  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    updateTextareaHeight(event) {
      const textField = this.$refs.textarea

      if (textField) {
        // Disabled because of layout jumps
        // textField.removeAttribute('style')

        if (textField.clientHeight < textField.scrollHeight) {
          textField.style.height = textField.scrollHeight + 'px'
        }
      }
    },
  },
}

<template>
  <textarea
    ref="title"
    class="text-2xl font-bold overflow-hidden resize-none h-5"
    :value="value"
    placeholder="Title"
    @input="onInput($event)"
  />
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  },
  mounted() {
    this.resizeHandler = debounce(this.updateTitleHeight, 500)
    window.addEventListener('resize', this.resizeHandler)
    this.updateTitleHeight()
  },

  destroyed() {
    window.removeEventListener('resize', this.resizeHandler)
  },

  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
      this.updateTitleHeight()
    },

    updateTitleHeight(event) {
      const textField = this.$refs.title
      textField.removeAttribute('style')

      if (textField.clientHeight < textField.scrollHeight) {
        textField.style.height = textField.scrollHeight + 'px'
      }
    }
  }
}
</script>

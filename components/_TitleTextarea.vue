<template>
  <textarea
    ref="textarea"
    class="text-2xl bg-transparent font-bold overflow-hidden resize-none h-5"
    :value="value"
    placeholder="Title"
    @input="onInput($event)"
  />
</template>

<script>
import debounce from 'lodash.debounce'
import TextareaHeightUpdater from '@/mixins/textarea-height-updater.js'

export default {
  mixins: [TextareaHeightUpdater],
  props: {
    value: {
      type: String,
      required: false,
      default: '',
    },
  },

  methods: {
    onInput: debounce(function (event) {
      this.$emit('input', event.target.value)
      this.updateTextareaHeight()
    }, 250),
  },
}
</script>

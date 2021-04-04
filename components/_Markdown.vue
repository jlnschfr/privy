<template>
  <div>
    <textarea
      v-if="editable"
      ref="textarea"
      :value="data"
      class="w-full h-1 resize-none overflow-hidden bg-transparent privy-focus"
      @input="onInput"
      @blur="onBlur"
    ></textarea>
    <div
      v-if="!editable"
      tabindex="0"
      class="Markdown privy-focus"
      @click="onClickOrEnter"
      @keyup.enter="onClickOrEnter"
      v-html="compiledMarkdown"
    ></div>
  </div>
</template>

<script>
import DOMPurify from 'dompurify'
import marked from 'marked'
import debounce from 'lodash.debounce'
import TextareaHeightUpdater from '@/mixins/textarea-height-updater.js'

export default {
  mixins: [TextareaHeightUpdater],
  props: {
    uuid: {
      type: String,
      required: true,
    },
    data: {
      type: String,
      required: false,
      default: '',
    },
  },

  data() {
    return {
      editable: false,
    }
  },

  computed: {
    compiledMarkdown() {
      const convertedHTML = marked(this.data)
      const purifiedHTML = DOMPurify.sanitize(convertedHTML)
      return purifiedHTML
    },
  },

  methods: {
    onClickOrEnter() {
      this.editable = true

      this.$nextTick(() => {
        this.$refs.textarea.focus()
        this.updateTextareaHeight()
      })
    },

    onBlur() {
      this.editable = false
    },

    onInput: debounce(function (event) {
      this.$emit('update', { uuid: this.uuid, data: event.target.value })
      this.updateTextareaHeight()
    }, 25),
  },
}
</script>

<style>
.Markdown {
  line-height: 1.6;
  min-height: 1.5rem;
}

.Markdown > *:not(:first-child),
.Markdown.Markdown h1 + h2,
.Markdown.Markdown h2 + h3,
.Markdown.Markdown h3 + h4,
.Markdown.Markdown h4 + h5,
.Markdown.Markdown h5 + h6 {
  margin-top: 1rem;
}

.Markdown > h1:not(:first-child) {
  margin-top: 3rem;
}

.Markdown > h2:not(:first-child) {
  margin-top: 2.5rem;
}

.Markdown > h3:not(:first-child),
.Markdown > h4:not(:first-child),
.Markdown > h5:not(:first-child),
.Markdown > h6:not(:first-child) {
  margin-top: 2rem;
}

.Markdown h1 {
  font-size: 1.5rem;
  font-weight: bold;
}

.Markdown h2 {
  font-size: 1.3rem;
  font-weight: bold;
}

.Markdown h3 {
  font-size: 1.1rem;
  font-weight: bold;
}

.Markdown h4,
.Markdown h5,
.Markdown h6 {
  font-size: 1rem;
  font-weight: bold;
}

.Markdown ul,
.Markdown ol {
  margin-left: 1rem;
}

.Markdown ul li,
.Markdown ol li {
  padding-left: 0.5rem;
}

.Markdown ul {
  list-style: disc;
}

.Markdown ol {
  list-style: upper-greek;
}

.Markdown a {
  border-bottom: 0.1rem solid theme('colors.primary.500');
  color: theme('colors.primary.500');
}

.Markdown blockquote {
  border-left: 0.2rem solid theme('colors.primary.600');
  color: theme('colors.primary.600');
  max-width: 80%;
  font-style: italic;
  padding-left: 1rem;
}
</style>

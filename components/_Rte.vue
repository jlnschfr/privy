<template>
  <editor-content :editor="editor" />
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import { History } from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
  },
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
    editable: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    editable: function (val) {
      this.editor.setOptions({
        editable: val,
      })
    },
  },

  mounted() {
    this.editor = new Editor({
      extensions: [new History()],
      content: this.data,
      onUpdate: (el) => {
        this.$emit('update', { uuid: this.uuid, data: el.getHTML() })
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.ProseMirror {
  outline: none;
}
</style>

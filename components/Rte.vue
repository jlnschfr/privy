<template>
  <div>
    <editor-menu-bar
      v-slot="{ commands, isActive }"
      :editor="editor"
      class="border-b border-pgray-medium py-2"
    >
      <div class="border-black">
        <button
          class="font-bold"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          B
        </button>
        <button
          class="italic ml-3"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic()"
        >
          I
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="py-3" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Heading, Bold, Italic } from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    uuid: {
      type: String,
      required: true
    },
    data: {
      type: String,
      required: false,
      default: ''
    },
    editable: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  data() {
    return {
      editor: null
    }
  },

  watch: {
    editable: function(val) {
      // eslint-disable-next-line no-console
      console.log(this.editor)
      this.editor.setOptions({
        editable: val
      })
    }
  },

  mounted() {
    this.editor = new Editor({
      extensions: [new Heading({ levels: [2] }), new Bold(), new Italic()],
      content: this.data,
      onUpdate: (el) => {
        this.$emit('update', { uuid: this.uuid, data: el.getHTML() })
      }
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

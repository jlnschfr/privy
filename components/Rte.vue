<template>
  <div class="bg-pgray-medium">
    <editor-menu-bar v-slot="{ commands, isActive }" :editor="editor">
      <div class="border-black">
        <button
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          Bold
        </button>
        <button
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { Heading, Bold } from 'tiptap-extensions'

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
    }
  },
  data() {
    return {
      editor: null
    }
  },
  mounted() {
    this.editor = new Editor({
      extensions: [new Heading({ levels: [2] }), new Bold()],
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

<style>
h2 {
  font-size: 2rem;
}
</style>

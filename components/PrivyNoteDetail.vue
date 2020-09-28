<template>
  <section
    class="max-w-2xl mx-auto shadow-xl min-h-detail flex flex-col justify-between bg-neutral-600"
  >
    <article>
      <header class="flex items-center border-b border-neutral-400 p-3 md:p-4">
        <PrivyDate :date="note.createdDate" />
        <TitleTextarea
          ref="title"
          v-model="title"
          class="flex-auto immune-for-enter mr-2"
        />
        <PrivyNoteInteraction :note="note" />
      </header>

      <div class="p-3 sm:p-4">
        <PrivyDraggableItems :items="items" @changed="items = $event" />
      </div>
    </article>

    <footer
      class="flex flex-col md:flex-row justify-between md:items-end border-t border-neutral-400 p-3 md:p-4"
    >
      <aside class="w-full flex-shrink md:max-w-tags md:mr-4">
        <Tags :tags="tags" @changed="tags = $event" />
      </aside>
      <nav class="flex flex-none md:justify-between mt-6 md:mt-0">
        <Button class="mr-4" @click="createRte">
          Add Text
        </Button>
        <Button @click="createTask">Add Task</Button>
      </nav>
    </footer>
  </section>
</template>

<script>
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import uuid from 'uuid'
import Button from '@/components/_Button'
import PrivyDate from '@/components/PrivyDate'
import PrivyDraggableItems from '@/components/PrivyDraggableItems'
import PrivyNoteInteraction from '@/components/PrivyNoteInteraction'
import Tags from '@/components/_Tags'
import TitleTextarea from '@/components/_TitleTextarea'

export default {
  components: {
    Button,
    PrivyDate,
    PrivyDraggableItems,
    PrivyNoteInteraction,
    Tags,
    TitleTextarea
  },

  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    note: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data() {
    return {
      title: this.note.title || '',
      items: this.note.items || [],
      isFav: this.note.isFav || false,
      tags: this.note.tags || []
    }
  },

  watch: {
    title: debounce(function() {
      this.onChange()
    }, 500),
    items: debounce(function() {
      this.onChange()
    }, 500),
    tags: debounce(function() {
      this.onChange()
    }, 500),
    note: function() {
      if (this.note.title && this.title !== this.note.title) {
        this.title = this.note.title
      }
      if (this.note.isFav && this.isFav !== this.note.isFav) {
        this.isFav = this.note.isFav
      }
      if (this.note.items && !isEqual(this.items, this.note.items)) {
        this.items = this.note.items
      }
      if (this.note.tags && !isEqual(this.tags, this.note.tags)) {
        this.tags = this.note.tags
      }
    }
  },

  mounted() {
    if (!this.title) {
      this.$refs.title.$el.focus()
    }
    window.addEventListener('keyup', this.handleKeyUp)
  },

  beforeDestroy() {
    window.removeEventListener('keyup', this.handleKeyUp)
  },

  methods: {
    onChange() {
      if (this.id === '') {
        this.create()
      } else {
        this.update()
      }
    },

    create() {
      const data = this.collectData()
      this.$store.dispatch('addNote', data).then((id) => {
        this.$router.push(`/note/?id=${id}`)
      })
    },

    update() {
      const data = this.collectData()
      this.$store.dispatch('updateNote', data).then(() => {})
    },

    collectData(options) {
      return {
        id: this.id === '' ? uuid() : this.id,
        createdDate: new Date().toISOString(),
        title: this.title || 'untitled',
        isFav: this.isFav,
        items: this.items,
        tags: this.tags
      }
    },

    handleKeyUp(event) {
      const focusEl = document.activeElement

      if (focusEl && !focusEl.closest('.immune-for-enter')) {
        if (event.keyCode === 13 && event.shiftKey) {
          this.createRte()
        } else if (event.keyCode === 13) {
          const draggableItem = focusEl.closest('.draggable-item')

          if (draggableItem) {
            const uuid = draggableItem.dataset.uuid
            const index = this.items.findIndex((item) => item.uuid === uuid)
            this.createTask(index)
          } else {
            this.createTask()
          }
        }
      }
    },

    createRte() {
      const rte = {
        type: 'Rte',
        isNew: true,
        uuid: uuid()
      }

      this.items.push(rte)
    },

    createTask(index) {
      const task = {
        type: 'Task',
        isNew: true,
        uuid: uuid()
      }

      if (!isNaN(index)) {
        this.items.splice(index + 1, 0, task)
      } else {
        this.items.push(task)
      }
    }
  }
}
</script>

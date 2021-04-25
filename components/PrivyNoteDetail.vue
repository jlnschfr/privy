<template>
  <section
    class="max-w-3xl mx-auto shadow-xl min-h-detail flex flex-col justify-between bg-neutral-600 dark:bg-neutral-100 transition duration-300"
  >
    <article>
      <header
        class="flex items-center border-b border-neutral-400 dark:border-neutral-200 p-3 md:p-4 transition duration-300"
      >
        <PrivyDate :date="note.createdDate" />
        <TitleTextarea ref="title" v-model="title" class="flex-auto mr-2" />
        <PrivyNoteInteraction :note="note" />
      </header>

      <div class="p-3 sm:p-4">
        <PrivyDraggableItems :items="items" @changed="items = $event" />
      </div>
    </article>

    <footer
      class="flex flex-col md:flex-row justify-between md:items-end border-t border-neutral-400 dark:border-neutral-200 p-3 md:p-4 transition duration-300"
    >
      <aside class="w-full flex-shrink md:max-w-tags md:mr-4">
        <Tags :tags="tags" @changed="tags = $event" />
      </aside>
      <nav class="flex flex-none md:justify-between mt-6 md:mt-0">
        <Button class="mr-4" @click="createMarkdown"> Add Markdown </Button>
        <Button @click="createTask">Add Task</Button>
      </nav>
    </footer>
  </section>
</template>

<script>
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import { v4 as uuid } from 'uuid'
import { first } from '@/utils/array'

export default {
  components: {
    Button: () => import('@/components/_Button'),
    PrivyDate: () => import('@/components/PrivyDate'),
    PrivyDraggableItems: () => import('@/components/PrivyDraggableItems'),
    PrivyNoteInteraction: () => import('@/components/PrivyNoteInteraction'),
    Tags: () => import('@/components/_Tags'),
    TitleTextarea: () => import('@/components/_TitleTextarea'),
  },

  props: {
    id: {
      type: String,
      required: false,
      default: '',
    },
    note: {
      type: Object,
      required: false,
      default: () => {},
    },
  },

  data() {
    return {
      title: this.note.title || '',
      items: this.note.items || [],
      isFav: this.note.isFav || false,
      tags: this.note.tags || [],
    }
  },

  watch: {
    title: debounce(function () {
      this.onChange()
    }, 500),
    items: debounce(function () {
      this.onChange()
    }, 500),
    tags: debounce(function () {
      this.onChange()
      this.updateQueryParam()
    }, 500),
    note: function () {
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
    },
  },

  mounted() {
    if (!this.title && this.$refs.title) {
      this.$refs.title.$el.focus()
    }
    window.addEventListener('keydown', this.handleKeyUp)
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyUp)
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
        tags: this.tags,
      }
    },

    handleKeyUp(event) {
      const focusEl = document.activeElement

      if (
        focusEl === document.querySelector('body') ||
        focusEl.closest('.new-task-on-enter')
      ) {
        if (event.keyCode === 13 && event.shiftKey) {
          this.createMarkdown()
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

    createMarkdown() {
      const markdown = {
        type: 'Markdown',
        isNew: true,
        uuid: uuid(),
      }

      this.items.push(markdown)
    },

    createTask(index) {
      const task = {
        type: 'Task',
        isNew: true,
        uuid: uuid(),
      }

      if (!isNaN(index)) {
        this.items.splice(index + 1, 0, task)
      } else {
        this.items.push(task)
      }
    },

    updateQueryParam() {
      let queryTag = this.$route.query.tag || ''

      if (
        (!queryTag && first(this.tags)) ||
        (queryTag && !this.tags.find((tag) => tag.text === queryTag))
      ) {
        queryTag = first(this.tags).text
      } else if (queryTag && !this.tags.length) {
        queryTag = ''
      }

      this.$router.push({
        query: Object.assign({}, this.$route.query, {
          tag: queryTag,
        }),
      })
    },
  },
}
</script>

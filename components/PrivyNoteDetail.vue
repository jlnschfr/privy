<template>
  <section
    class="max-w-2xl mx-auto shadow-xl text-pblue-medium min-h-detail flex flex-col justify-between bg-white"
  >
    <article>
      <header
        class="flex justify-between items-center border-b border-pblue-light p-4r xl:p-2r"
      >
        <TitleTextarea
          ref="title"
          v-model="title"
          class="flex-auto immune-for-enter"
        />
        <p class="flex-initial text-right">{{ dateString }}</p>
      </header>

      <div class="p-4r xl:p-2r">
        <PrivyDraggableItems
          :key="key"
          :items="items"
          @changed="items = $event"
        />
      </div>
    </article>

    <footer>
      <aside class="p-4r xl:p-2r">
        <Tags :tags="tags" @changed="tags = $event" />
      </aside>
      <div
        class="flex justify-between items-center p-4r xl:p-2r border-t border-pblue-light"
      >
        <p>
          <span v-if="tasks.length">{{ donePercentage }}% done</span>
        </p>
        <nav>
          <Button type="button" class="mr-4" @click="createRte">
            Add Text
          </Button>
          <Button type="button" @click="createTask">Add Task</Button>
        </nav>
      </div>
    </footer>
  </section>
</template>

<script>
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import uuid from 'uuid'
import { createDateString } from '@/utils/date'
import Button from '@/components/_Button'
import PrivyDraggableItems from '@/components/PrivyDraggableItems'
import Tags from '@/components/_Tags'
import TitleTextarea from '@/components/_TitleTextarea'

export default {
  components: {
    Button,
    PrivyDraggableItems,
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
      tags: this.note.tags || [],
      key: 0
    }
  },

  computed: {
    dateString: function() {
      return createDateString(this.note.createdDate)
    },
    tasks: function() {
      return this.items.filter((item) => {
        return item.type === 'Task'
      })
    },
    done: function() {
      return this.tasks.filter((item) => {
        return item.data && item.data.state
      })
    },
    donePercentage: function() {
      return this.tasks.length
        ? Math.round((this.done.length * 100) / this.tasks.length)
        : ''
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
        this.key += 1
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
        this.$router.push(`/note?id=${id}`)
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

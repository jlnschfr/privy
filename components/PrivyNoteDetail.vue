<template>
  <section
    class="max-w-2xl mx-auto shadow-xl text-pblue-medium min-h-detail flex flex-col justify-between"
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
        <DraggableItems :key="key" :items="items" @changed="items = $event" />
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
          <Button text="Add Text" type="text" class="mr-4" @click="createRte" />
          <Button text="Add Task" type="text" @click="createTask" />
        </nav>
      </div>
    </footer>
  </section>
</template>

<script>
import Tags from '@/components/_Tags'
import TitleTextarea from '@/components/_TitleTextarea'
import Button from '@/components/_Button'
import DraggableItems from '@/components/_DraggableItems'
import isEqual from 'lodash.isequal'
import debounce from 'lodash.debounce'
import uuid from 'uuid'
import { createDateString } from '@/utils/date'

export default {
  components: {
    DraggableItems,
    Button,
    TitleTextarea,
    Tags
  },

  props: {
    id: {
      type: String,
      required: false,
      default: ''
    },
    data: {
      type: Object,
      required: false,
      default: () => {}
    }
  },

  data() {
    return {
      title: this.data.title || '',
      items: this.data.items || [],
      isFav: this.data.isFav || false,
      tags: this.data.tags || [],
      key: 0
    }
  },

  computed: {
    dateString: function() {
      return createDateString(this.data.createdDate)
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
    data: function() {
      if (this.data.title && this.title !== this.data.title) {
        this.title = this.data.title
      }
      if (this.data.isFav && this.isFav !== this.data.isFav) {
        this.isFav = this.data.isFav
      }
      if (this.data.items && !isEqual(this.items, this.data.items)) {
        this.items = this.data.items
        this.key += 1
      }
      if (this.data.tags && !isEqual(this.tags, this.data.tags)) {
        this.tags = this.data.tags
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
      this.$store.dispatch('addItem', data).then((id) => {
        this.$router.push(`/note?id=${id}`)
      })
    },

    update() {
      const data = this.collectData()
      this.$store.dispatch('updateItem', data).then(() => {})
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

<template>
  <section
    class="max-w-2xl mx-auto shadow-xl text-pblue-medium min-h-detail flex flex-col justify-between"
  >
    <article>
      <header
        class="flex justify-between items-center border-b border-pblue-light p-4r xl:p-2r"
      >
        <TitleTextarea ref="title" v-model="title" class="flex-auto" />
        <p class="flex-initial text-right">{{ dateString }}</p>
      </header>

      <div class="p-4r xl:p-2r">
        <DraggableItems :id="id" ref="items" />
      </div>
    </article>

    <footer>
      <aside class="p-4r xl:p-2r">
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          @tags-changed="(newTags) => (tags = newTags)"
        />
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
import VueTagsInput from '@johmun/vue-tags-input'
import TitleTextarea from '@/components/_TitleTextarea'
import Button from '@/components/_Button'
import DraggableItems from '@/components/_DraggableItems'
import debounce from 'lodash.debounce'
import isEqual from 'lodash.isequal'
import uuid from 'uuid'

import { createDateString } from '@/utils/date'

export default {
  components: {
    DraggableItems,
    Button,
    TitleTextarea,
    VueTagsInput
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
      tag: ''
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
    tags: debounce(function() {
      this.onChange()
    }, 500),
    data: debounce(function() {
      if (this.title !== this.data.title) {
        this.title = this.data.title || ''
      }

      if (this.isFav !== this.data.isFav) {
        this.isFav = this.data.isFav || ''
      }

      if (!isEqual(this.items, this.data.items)) {
        this.items = this.data.items || []
      }

      if (!isEqual(this.tags, this.data.tags)) {
        this.items = this.data.items || []
      }
    }, 500)
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
    handleKeyUp(event) {
      if (event.keyCode === 13 && event.shiftKey) {
        this.createRte()
      } else if (event.keyCode === 13) {
        this.createTask()
      }
    },
    createRte() {
      const rte = {
        type: 'Rte',
        uuid: uuid()
      }

      this.items.push(rte)
    },

    createTask() {
      const task = {
        type: 'Task',
        uuid: uuid()
      }

      this.items.push(task)
      const items = this.$refs.items.$el

      setTimeout(() => {
        items.lastChild.querySelector('input:not(.hidden').focus()
      }, 50)
    },

    onChange(value) {
      if (this.id === '') {
        this.create()
      } else {
        this.update()
      }
    },

    create() {
      const data = this.collectData({ initial: true })
      this.$store.dispatch('addItem', data).then((id) => {
        this.$router.push(`/note?id=${id}`)
      })
    },

    update() {
      const data = this.collectData({ initial: false })
      this.$store.dispatch('updateItem', data).then(() => {})
    },

    collectData(options) {
      return {
        id: options.initial ? uuid() : this.id,
        createdDate: new Date().toISOString(),
        title: this.title || 'untitled',
        isFav: this.isFav,
        items: this.items,
        tags: this.tags
      }
    }
  }
}
</script>

<style>
.vue-tags-input.vue-tags-input {
  max-width: none;
}

.vue-tags-input .ti-new-tag-input-wrapper {
  font-size: inherit;
}

.vue-tags-input .ti-new-tag-input::placeholder {
  color: theme('colors.pblue.light');
}

.vue-tags-input .ti-input {
  border: none;
  padding: 0;
}

.vue-tags-input .ti-tag {
  margin: 4px;
  font-size: inherit;
  background-color: theme('colors.pblue.medium');
  transition: background-color 300ms;
}

.vue-tags-input .ti-tag:hover {
  background-color: theme('colors.porange.medium');
}
</style>

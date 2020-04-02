<template>
  <section
    class="max-w-2xl mx-auto shadow-xl text-pblue-light min-h-detail flex flex-col justify-between"
  >
    <article>
      <header
        class="flex justify-between items-center border-b border-pblue-light p-4r xl:p-2r"
      >
        <TitleTextarea ref="title" v-model="title" class="flex-auto" />
        <p class="flex-initial text-right">{{ dateString }}</p>
      </header>

      <div class="p-4r xl:p-2r">
        <Draggable
          v-model="items"
          handle=".Dragger"
          ghost-class="Ghost"
          @start="isDragging = true"
          @end="isDragging = false"
        >
          <div
            v-for="item in items"
            :key="item.uuid"
            class="group relative pr-4r xl:pr-2r mt-4 first:mt-0 pl-4r sm:pl-0"
          >
            <component
              :is="item.type"
              :data="item.data"
              :uuid="item.uuid"
              :editable="!isDragging"
              @update="onItemUpdate"
            ></component>
            <button
              class="Dragger absolute inset-y-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <DragIcon class="DragIcon fill-current" />
            </button>
            <button
              class="Close absolute inset-y-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              @click="onItemDelete(item.uuid)"
            >
              <CloseIcon class="CloseIcon fill-current" />
            </button>
          </div>
        </Draggable>
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
import Rte from '@/components/_Rte'
import Task from '@/components/_Task'
import Button from '@/components/_Button'
import Draggable from 'vuedraggable'
import debounce from 'lodash.debounce'
import uuid from 'uuid'
import DragIcon from '@/assets/svg/new/drag.svg'
import CloseIcon from '@/assets/svg/new/cross.svg'
import { createDateString } from '@/utils/date'

export default {
  components: {
    Rte,
    Task,
    Draggable,
    DragIcon,
    CloseIcon,
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
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      isDragging: false,
      title: this.data.title || '',
      items: this.data.items || [],
      isFav: this.data.isFav || false,
      tag: '',
      tags: this.data.tags || []
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
    }, 500)
  },

  mounted() {
    if (!this.title) {
      this.$refs.title.$el.focus()
    }
  },

  methods: {
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
    },

    onItemUpdate(payload) {
      const index = this.items.findIndex((item) => item.uuid === payload.uuid)
      const items = this.items.slice()
      items[index].data = payload.data
      this.items = items
    },

    onItemDelete(uuid) {
      const index = this.items.findIndex((item) => item.uuid === uuid)
      this.items.splice(index, 1)
    },

    onChange() {
      if (this.id === '') {
        this.create()
      } else {
        this.update()
      }
    },

    create() {
      const data = this.prepareData(true)
      this.$store.dispatch('addItem', data).then((id) => {
        this.$router.push(`/note?id=${id}`)
      })
    },

    update() {
      const data = this.prepareData(false)
      this.$store.dispatch('updateItem', data).then(() => {})
    },

    prepareData(initial) {
      return {
        id: initial ? uuid() : this.id,
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
.Dragger {
  left: 0;
  transform: translateX(-150%);
}

.DragIcon {
  width: 0.75rem;
}

.CloseIcon {
  width: 0.6rem;
}

.Ghost {
  background-color: theme('colors.pgray.light');
  color: theme('colors.pblue.dark');
}

.vue-tags-input.vue-tags-input {
  max-width: none;
}

.vue-tags-input .ti-new-tag-input-wrapper {
  font-size: inherit;
}

.vue-tags-input .ti-input {
  border: none;
  padding: 0;
}

.vue-tags-input .ti-tag {
  margin: 4px;
  font-size: inherit;
  background-color: theme('colors.pblue.light');
}

@media (max-width: 640px) {
  .Dragger,
  .Close {
    opacity: 1;
    transform: translateX(0);
  }

  .Dragger {
    transform: translateX(-50%);
  }
}
</style>

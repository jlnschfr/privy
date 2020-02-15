<template>
  <div class="max-w-3xl mx-auto mt-10 bg-pgray-light p-4 shadow-xl">
    <input v-model="title" class="text-2xl bg-pgray-light" />

    <Draggable
      v-model="items"
      @start="isDragging = true"
      @end="isDragging = false"
    >
      <div v-for="(item, key) in items" :key="key" class="relative">
        <component
          :is="item.type"
          :data="item.data"
          :uuid="item.uuid"
          :editable="!isDragging"
          @update="handleUpdate"
        ></component>
        <button
          class="absolute inset-y-0 right-0"
          @click="handleDelete(item.uuid)"
        >
          &times;
        </button>
      </div>
    </Draggable>
    <button :disabled="isUpdating" @click="createRte">Create Text</button>
    <button :disabled="isUpdating" @click="createTasks">Create Tasks</button>
  </div>
</template>

<script>
import Rte from '@/components/Rte'
import Tasks from '@/components/Tasks'
import Draggable from 'vuedraggable'
import debounce from 'lodash.debounce'
import uuid from 'uuid'

export default {
  components: {
    Rte,
    Tasks,
    Draggable
  },

  props: {
    id: {
      type: String,
      required: true
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
      isUpdating: false,
      title: this.data.title || '',
      items: this.data.items || []
    }
  },

  watch: {
    title: debounce(function() {
      this.handleChange()
    }, 500),
    items: debounce(function() {
      this.handleChange()
    }, 500)
  },

  methods: {
    createRte() {
      const rte = {
        type: 'Rte',
        uuid: uuid()
      }

      this.items.push(rte)
    },

    createTasks() {
      const tasks = {
        type: 'Tasks',
        uuid: uuid()
      }

      this.items.push(tasks)
    },

    handleUpdate(payload) {
      const index = this.items.findIndex((item) => item.uuid === payload.uuid)
      const items = this.items.slice()
      items[index].data = payload.data
      this.items = items
    },

    handleDelete(uuid) {
      const index = this.items.findIndex((item) => item.uuid === uuid)
      this.items.splice(index, 1)
    },

    handleChange() {
      if (!this.isUpdating) {
        this.isUpdating = true

        if (this.id === 'new') {
          this.add()
        } else {
          this.update()
        }
      }
    },

    add() {
      const data = {
        title: this.title || 'untitled',
        items: this.items
      }

      this.$store.dispatch('addItem', data).then((id) => {
        this.$router.push(`/notes/${id}`)
      })
    },

    update() {
      const data = {
        id: this.id,
        title: this.title,
        items: this.items
      }
      this.$store.dispatch('updateItem', data).then(() => {
        this.isUpdating = false
      })
    }
  }
}
</script>

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
          @update="onItemUpdate"
        ></component>
        <button
          class="absolute inset-y-0 right-0"
          @click="onItemDelete(item.uuid)"
        >
          <Close class="w-1 h-1 fill-current" />
        </button>
      </div>
    </Draggable>
    <nav class="mt-4 ">
      <button :disabled="isUpdating" @click="createRte">
        <ClipboardWithText class="w-3 h-3 fill-current mr-2" />
      </button>
      <button :disabled="isUpdating" @click="createTasks">
        <ClipboardWithCheckbox class="w-3 h-3 fill-current" />
      </button>
    </nav>
  </div>
</template>

<script>
import Rte from '@/components/Rte'
import Tasks from '@/components/Tasks'
import Draggable from 'vuedraggable'
import debounce from 'lodash.debounce'
import uuid from 'uuid'
import Close from '@/assets/svg/close.svg'
import ClipboardWithCheckbox from '@/assets/svg/clipboard-with-checkbox.svg'
import ClipboardWithText from '@/assets/svg/clipboard-with-text.svg'

export default {
  components: {
    Rte,
    Tasks,
    Draggable,
    Close,
    ClipboardWithCheckbox,
    ClipboardWithText
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
      this.onChange()
    }, 500),
    items: debounce(function() {
      this.onChange()
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

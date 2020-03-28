<template>
  <div class="max-w-2xl mx-auto mt-4r shadow-xl text-pblue-light">
    <header
      class="flex justify-between items-center border-b border-pblue-light p-4r xl:p-2r"
    >
      <input v-model="title" class="text-3xl flex-auto" />
      <p class="flex-initial">{{ createdDateString }}</p>
    </header>

    <article class="p-4r xl:p-2r">
      <Draggable
        v-model="items"
        handle=".Dragger"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <div
          v-for="item in items"
          :key="item.uuid"
          class="group relative pr-4r xl:pr-2r mt-4 first:mt-0"
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
            class="absolute inset-y-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            @click="onItemDelete(item.uuid)"
          >
            <CloseIcon class="CloseIcon fill-current" />
          </button>
        </div>
      </Draggable>
    </article>

    <footer class="flex justify-between items-center p-4r xl:p-2r">
      <p>{{ Math.round((done.length * 100) / tasks.length) }}% done</p>
      <nav>
        <Button
          :disabled="isUpdating"
          text="Add Text"
          type="text"
          class="mr-4"
          @click="createRte"
        />

        <Button
          :disabled="isUpdating"
          text="Add Todo"
          type="text"
          class="mr-4"
          @click="createTasks"
        />
      </nav>
    </footer>
  </div>
</template>

<script>
import Rte from '@/components/Rte'
import Tasks from '@/components/Tasks'
import Button from '@/components/Button'
import Draggable from 'vuedraggable'
import debounce from 'lodash.debounce'
import uuid from 'uuid'
import DragIcon from '@/assets/svg/new/drag.svg'
import CloseIcon from '@/assets/svg/new/cross.svg'

export default {
  components: {
    Rte,
    Tasks,
    Draggable,
    DragIcon,
    CloseIcon,
    Button
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
      items: this.data.items || [],
      isPinned: this.data.isPinned || false
    }
  },

  computed: {
    createdDateString: function() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }
      return new Date(this.data.createdDate).toLocaleString('de-DE', options)
    },
    tasks: function() {
      return this.items.filter((item) => {
        return item.type === 'Tasks'
      })
    },
    done: function() {
      return this.tasks.filter((item) => {
        return item.type === 'Tasks' && item.data && item.data.state
      })
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
        createdDate: new Date().toISOString(),
        title: this.title,
        isPinned: this.isPinned,
        items: this.items
      }
      this.$store.dispatch('updateItem', data).then(() => {
        this.isUpdating = false
      })
    }
  }
}
</script>

<style scoped>
.Dragger {
  left: -1.25vw;
}

.DragIcon {
  width: 0.75rem;
}

.CloseIcon {
  width: 0.6rem;
}
</style>

<template>
  <div
    class="group cursor-pointer min-h-notes grid grid-cols-7 shadow-lg"
    @click="open(item.id)"
  >
    <div
      class="p-4 col-start-1 col-end-5 flex items-center relative"
      :class="{
        'bg-pblue-dark text-white': isPinned,
        'text-pblue-light': !isPinned
      }"
    >
      <h2 class="text-5xl leading-none">{{ item.title }}</h2>
      <button class="absolute bottom-1 left-2">
        {{ createdDateString }}
      </button>
    </div>
    <div
      class="p-4 col-start-5 col-end-8 flex items-center text-white bg-pblue-light relative"
    >
      <p class="flex flex-col text-right mr-4">
        <strong class="text-5xl leading-none">{{ tasks.length }}</strong
        >tasks
      </p>
      <p class="flex flex-col text-right">
        <strong class="text-5xl leading-none">{{ done.length }}</strong
        >done
      </p>
      <button
        class="absolute top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        @click.stop="updatePinState(item)"
      >
        <Pin class="fill-current w-3" />
      </button>
      <button
        :class="{
          'border-porange-light': isActiveForDelete,
          'border-pblue-light': !isActiveForDelete
        }"
        class="absolute bottom-1 right-2 border-b-2 border-solid transition-all duration-300"
        @click.stop="remove(item)"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import Pin from '@/assets/svg/pin.svg'

export default {
  components: {
    Pin
  },

  props: {
    item: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isActiveForDelete: false
    }
  },

  computed: {
    isPinned: function() {
      return this.item.isPinned
    },
    createdDateString: function() {
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }

      return new Date(this.item.createdDate).toLocaleString('de-DE', options)
    },
    tasks: function() {
      return this.item.items.filter((item) => {
        return item.type === 'Tasks'
      })
    },
    done: function() {
      return this.tasks.filter((item) => {
        return item.type === 'Tasks' && item.data && item.data.state
      })
    }
  },

  methods: {
    open(id) {
      this.$router.push(`/notes/${id}`)
    },

    remove(item) {
      if (this.isActiveForDelete) {
        this.$store.dispatch('deleteItem', item)
      } else {
        this.isActiveForDelete = true
        setTimeout(() => {
          this.isActiveForDelete = false
        }, 4000)
      }
    },

    updatePinState(item) {
      const data = {
        ...item,
        isPinned: !this.isPinned
      }

      data.createdDate = new Date().toISOString()

      this.$store.dispatch('updateItem', data)
    }
  }
}
</script>

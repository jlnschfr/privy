<template>
  <article
    class="group cursor-pointer min-h-notes grid grid-cols-7 shadow-lg"
    @click="open(item.id)"
  >
    <div
      data-name="left"
      class="p-4r pb-4r xl:p-2r col-start-1 col-end-5 flex items-center relative"
      :class="{
        'bg-pblue-dark text-white': isPinned,
        'text-pblue-light': !isPinned
      }"
    >
      <h2 class="text-3xl lg:text-4xl leading-none w-full">{{ item.title }}</h2>
      <p class="absolute bottom-2r left-4r xl:bottom-1r xl:left-2r">
        {{ createdDateString }}
      </p>
    </div>
    <div
      data-name="right"
      class="p-4r xl:p-2r col-start-5 col-end-8 flex items-center justify-end text-white bg-pblue-light relative"
    >
      <p class="flex flex-col text-right mr-4r md:mr-2r">
        <strong class="text-5xl leading-none">{{ tasks.length }}</strong
        >tasks
      </p>
      <p class="flex flex-col text-right">
        <strong class="text-5xl leading-none">{{ done.length }}</strong
        >done
      </p>
      <button
        :class="{
          'text-pblue-dark': !isPinned
        }"
        class="absolute top-2r right-4r xl:top-1r xl:right-2r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        @click.stop="updatePinState(item)"
      >
        <Pin class="fill-current w-3" />
      </button>
      <button
        :class="{
          'border-porange-light': isActiveForDelete,
          'border-pblue-light': !isActiveForDelete
        }"
        class="absolute bottom-2r right-4r xl:bottom-1r xl:right-2r border-b-2 border-solid transition-all duration-300"
        @click.stop="remove(item)"
      >
        Delete
      </button>
    </div>
  </article>
</template>

<script>
import Pin from '@/assets/svg/new/heart.svg'

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
        month: 'numeric',
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

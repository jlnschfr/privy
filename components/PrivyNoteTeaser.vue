<template>
  <article
    class="PrivyNoteTeaser group cursor-pointer min-h-notes grid grid-cols-7 shadow-lg"
    tabindex="0"
    @click="open(item.id)"
  >
    <div
      class="p-4r xl:p-2r col-start-1 col-end-5 flex items-center relative"
      :class="{
        'bg-pblue-dark text-white': item.isFav,
        'text-pblue-light': !item.isFav
      }"
    >
      <h2 class="text-3xl lg:text-4xl leading-none w-full">{{ item.title }}</h2>
      <p class="absolute bottom-2r left-4r xl:bottom-1r xl:left-2r">
        {{ dateString }}
      </p>
    </div>
    <div
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
          'text-pblue-dark': !item.isFav
        }"
        class="absolute top-2r right-4r xl:top-1r xl:right-2r opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-300"
        @click.stop="updateFavState(item)"
      >
        <FavIcon class="fill-current w-3" />
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
import FavIcon from '@/assets/svg/new/heart.svg'
import { createDateString } from '@/utils/date'

export default {
  components: {
    FavIcon
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
    dateString: function() {
      return createDateString(this.item.createdDate)
    },
    tasks: function() {
      return this.item.items.filter((item) => {
        return item.type === 'Task'
      })
    },
    done: function() {
      return this.tasks.filter((item) => {
        return item.data && item.data.state
      })
    }
  },

  methods: {
    open(id) {
      this.$router.push(`/note?id=${id}`)
    },

    remove(item) {
      if (this.isActiveForDelete) {
        this.$store.dispatch('deleteItem', item)
        this.isActiveForDelete = false
      } else {
        this.isActiveForDelete = true
        setTimeout(() => {
          this.isActiveForDelete = false
        }, 4000)
      }
    },

    updateFavState(item) {
      const data = {
        ...item,
        isFav: !this.item.isFav
      }

      data.createdDate = new Date().toISOString()
      this.$store.dispatch('updateItem', data)
    }
  }
}
</script>

<style scoped>
.PrivyNoteTeaser:focus {
  outline: theme('colors.porange.dark') solid 0.5rem;
}
</style>

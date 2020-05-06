<template>
  <article
    class="PrivyNoteTeaser group cursor-pointer min-h-notes grid grid-cols-7 shadow-lg bg-white"
    tabindex="0"
    @click="open(note.id)"
  >
    <div
      class="p-4r xl:p-2r col-start-1 col-end-5 flex items-center relative"
      :class="{
        'bg-pblue-dark text-white': note.isFav,
        'text-pblue-medium': !note.isFav
      }"
    >
      <h2 class="text-3xl lg:text-4xl leading-none w-full hyphens-auto">
        {{ note.title }}
      </h2>
      <p class="absolute bottom-2r left-4r xl:bottom-1r xl:left-2r">
        {{ dateString }}
      </p>
    </div>
    <div
      class="p-4r xl:p-2r col-start-5 col-end-8 flex items-center justify-between text-white bg-pblue-medium relative"
    >
      <p class="flex flex-col text-right">
        <strong class="text-5xl leading-none">{{ tasks.length }}</strong
        >tasks
      </p>
      <p class="flex flex-col text-right">
        <strong class="text-5xl leading-none">{{ done.length }}</strong
        >done
      </p>
      <Button
        type="button"
        :class="{
          'text-porange-medium': note.isFav
        }"
        class="absolute top-2r right-4r xl:top-1r xl:right-2r opacity-100 lg:opacity-0 group-hover:opacity-100 focus:opacity-100"
        @click="updateFavState(note)"
        @click.native.stop=""
      >
        <FavIcon class="fill-current w-3"
      /></Button>
      <Button
        type="button"
        class="absolute bottom-2r right-4r xl:bottom-1r xl:right-2r"
        :is-animating="isActiveForDelete"
        @click="remove(note)"
        @click.native.stop=""
        >Delete</Button
      >
    </div>
  </article>
</template>

<script>
import FavIcon from '@/assets/svg/new/heart.svg'
import { createDateString } from '@/utils/date'
import Button from '@/components/_Button'

export default {
  components: {
    FavIcon,
    Button
  },

  props: {
    note: {
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
    dateString() {
      return createDateString(this.note.createdDate)
    },
    tag() {
      return this.$route.query.tag ? this.$route.query.tag : ''
    },
    tasks() {
      return this.note.items.filter((item) => {
        return item.type === 'Task'
      })
    },
    done() {
      return this.tasks.filter((item) => {
        return item.data && item.data.state
      })
    }
  },

  methods: {
    open(id) {
      this.$router.push(`/note?id=${id}`)
    },

    remove(note) {
      if (this.isActiveForDelete) {
        if (this.tag === 'trash') {
          this.$store.dispatch('deleteNote', note)
        } else {
          this.note.tags.push({ text: 'Trash' })
          this.$store.dispatch('updateNote', this.note)
        }
        this.isActiveForDelete = false
      } else {
        this.isActiveForDelete = true
        setTimeout(() => {
          this.isActiveForDelete = false
        }, 4000)
      }
    },

    updateFavState(note) {
      const data = {
        ...note,
        isFav: !this.note.isFav
      }

      data.createdDate = new Date().toISOString()
      this.$store.dispatch('updateNote', data)
    }
  }
}
</script>

<style scoped>
/* .PrivyNoteTeaser:focus {
  outline: theme('colors.porange.dark') solid 0.5rem;
} */

.hyphens-auto {
  hyphens: auto;
}
</style>

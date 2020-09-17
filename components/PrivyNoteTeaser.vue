<template>
  <article
    class="PrivyNoteTeaser cursor-pointer shadow-lg bg-neutral-600"
    tabindex="0"
    @click="open(note.id)"
  >
    <div
      class="flex p-4"
      :class="{ 'items-center': !tasks.length, 'items-end': tasks.length }"
    >
      <div class="text-center border-r pr-2 mr-2 border-neutral-400">
        <span class="block">{{ month }}</span>
        <span class="block text-xl font-bold">{{ day }}</span>
        <span class="block">{{ year }}</span>
      </div>

      <div>
        <h2 class="text-2xl font-bold leading-none w-full hyphens-auto">
          {{ note.title }}
        </h2>
        <p v-if="tasks.length" class="mt-0_5">
          <span>{{ tasks.length }} tasks</span>
          <span>{{ done.length }} done</span>
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center">
        <p
          v-for="(noteTag, key) in note.tags.slice(0, 1)"
          :key="key"
          class="px-2 py-0_5 mr-1 bg-primary-500 text-neutral-600 rounded-full flex items-center justify-center"
        >
          {{ noteTag.text }}
        </p>
        <p v-if="note.tags.length > 1">+{{ note.tags.length - 1 }}</p>
      </div>
      <div class="flex items-center">
        <IconButton
          class="mr-2"
          :class="{
            'text-secondary-500': note.isFav
          }"
          @click="toggleFav(note)"
          @click.native.stop=""
        >
          <FavIcon
            class="w-2"
            :class="{
              'fill-current': note.isFav
            }"
          />
        </IconButton>
        <IconButton
          class="bg-primary-500 text-neutral-600"
          @click="remove(note)"
          @click.native.stop=""
        >
          <TrashIcon class="w-2 fill"
        /></IconButton>
      </div>
    </div>
  </article>
</template>

<script>
import FavIcon from '@/assets/svg/heart.svg'
import TrashIcon from '@/assets/svg/trash.svg'
import { createDateString } from '@/utils/date'
import IconButton from '@/components/_IconButton'

export default {
  components: {
    FavIcon,
    TrashIcon,
    IconButton
  },

  props: {
    note: {
      type: Object,
      required: true
    }
  },

  computed: {
    month() {
      return createDateString(this.note.createdDate, { month: 'short' })
    },
    day() {
      return createDateString(this.note.createdDate, { day: '2-digit' })
    },
    year() {
      return createDateString(this.note.createdDate, { year: 'numeric' })
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
      const alreadyTrashed = this.tag === 'trash'

      if (alreadyTrashed) {
        this.$store.dispatch('deleteNote', note)
      } else {
        this.note.tags.push({ text: 'Trash' })
        this.$store.dispatch('updateNote', this.note)
      }

      this.$store.dispatch('showSnackbar', {
        text: 'Item deleted',
        callback: () => {
          this.undoRemove(note, alreadyTrashed)
        }
      })
    },

    undoRemove(note, alreadyTrashed) {
      if (alreadyTrashed) {
        this.$store.dispatch('addNote', note)
      } else {
        const index = note.tags.findIndex((el) => el.text === 'Trash')
        note.tags.splice(index, 1)
        this.$store.dispatch('updateNote', note)
      }
    },

    toggleFav(note) {
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
.hyphens-auto {
  hyphens: auto;
}
</style>

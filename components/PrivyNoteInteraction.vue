<template>
  <div class="flex items-center">
    <IconButton
      label="add note to favorites"
      class="mr-2 hover:bg-neutral-500 dark-hover:bg-neutral-200"
      :class="{
        'text-secondary-500': note.isFav,
      }"
      @click="toggleFav(note)"
    >
      <FavIcon
        aria-hidden="true"
        class="w-2"
        :class="{
          'fill-current': note.isFav,
        }"
      />
    </IconButton>
    <IconButton
      label="delete note"
      class="bg-primary-500 hover:bg-primary-600 text-neutral-600"
      @click="remove(note)"
    >
      <TrashIcon aria-hidden="true" class="w-2 fill"
    /></IconButton>
  </div>
</template>

<script>
export default {
  components: {
    FavIcon: () => import('@/assets/svg/heart.svg'),
    IconButton: () => import('@/components/_IconButton'),
    TrashIcon: () => import('@/assets/svg/trash.svg'),
  },

  props: {
    note: {
      type: Object,
      required: true,
    },
  },

  computed: {
    currentRoute() {
      return this.$route.name
    },
  },

  methods: {
    remove(note) {
      const alreadyTrashed = this.note.tags.find((el) => el.text === 'Trash')

      if (alreadyTrashed) {
        this.$store.dispatch('deleteNote', note)
      } else {
        note.tags.push({ text: 'Trash' })
        this.$store.dispatch('updateNote', note)
      }

      if (this.currentRoute === 'note') {
        this.$router.push(`/notes/`)
      }

      this.$store.dispatch('showSnackbar', {
        text: 'Item deleted',
        action: 'undo',
        callback: () => {
          this.undoRemove(note, alreadyTrashed)
        },
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
        isFav: !this.note.isFav,
      }

      data.createdDate = new Date().toISOString()
      this.$store.dispatch('updateNote', data)
    },
  },
}
</script>

<template>
  <PrivyNoteOverview :notes="filteredNotes" />
</template>

<script>
import PrivyNoteOverview from '@/components/PrivyNoteOverview'

export default {
  transition: 'slide',
  components: {
    PrivyNoteOverview
  },

  computed: {
    tag() {
      return this.$route.query.tag ? this.$route.query.tag : ''
    },
    notes() {
      return this.$store.getters.getNotes()
    },
    notesNotTrashed() {
      return this.notes.filter(
        (note) => !note.tags.some((tag) => tag.text === 'Trash')
      )
    },
    notesTrashed() {
      return this.notes.filter((note) =>
        note.tags.some((tag) => tag.text === 'Trash')
      )
    },
    filteredNotes() {
      if (this.tag === 'trash') {
        return this.notesTrashed
      } else if (this.tag) {
        return this.getNotesNotTrashedFromTag(this.tag)
      } else {
        return this.notesNotTrashed
      }
    }
  },

  methods: {
    getNotesNotTrashedFromTag(currentTag) {
      return this.notesNotTrashed.filter((note) =>
        note.tags.some(
          (tag) => tag.text.toLowerCase() === currentTag.toLowerCase()
        )
      )
    }
  }
}
</script>

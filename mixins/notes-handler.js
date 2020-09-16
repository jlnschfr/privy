export default {
  computed: {
    notes() {
      return this.$store.getters.getNotes()
    },
    notesTrashed() {
      return this.notes.filter((note) =>
        note.tags.some((tag) => tag.text === 'Trash')
      )
    },
    notesNotTrashed() {
      return this.notes.filter(
        (note) => !note.tags.some((tag) => tag.text === 'Trash')
      )
    },
    filteredNotes() {
      if (this.currentTag === 'trash') {
        return this.notesTrashed
      } else if (this.currentTag) {
        return this.getNotesNotTrashedFromTag(this.currentTag)
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

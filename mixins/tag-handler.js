export default {
  computed: {
    currentTag() {
      return this.$route.query.tag ? this.$route.query.tag : ''
    },
    availableTags() {
      return this.notesNotTrashed
        .flatMap((note) => note.tags)
        .map((note) => note.text)
    },
    reducedTags() {
      return this.availableTags
        .filter((note, pos, arr) => arr.indexOf(note) === pos)
        .sort()
    }
  },
  watch: {
    currentTag() {
      this.$store.dispatch('setCurrentTag', this.currentTag)
    }
  },
  methods: {
    getTagAmount(currentTag) {
      if (currentTag) {
        return this.availableTags.filter((note) => note === currentTag).length
      } else {
        return this.notesNotTrashed.length
      }
    }
  }
}

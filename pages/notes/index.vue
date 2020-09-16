<template>
  <PrivyNoteOverview :notes="filteredNotes" />
</template>

<script>
import NotesHandler from '@/mixins/notes-handler.js'
import TagHandler from '@/mixins/tag-handler.js'
import PrivyNoteOverview from '@/components/PrivyNoteOverview'

export default {
  layout: 'app',
  transition: 'slide',
  components: {
    PrivyNoteOverview
  },
  mixins: [NotesHandler, TagHandler]
}
</script>

export default {
  getUser: (state) => () => {
    if (!state.user) return null
    return state.user
  },

  getNote: (state) => (id) => {
    if (!state.notes) return {}
    const data = state.notes.find((note) => note.id === id)
    return data || {}
  },

  getNotes: (state) => () => {
    if (!state.notes) return []
    return state.notes
  },

  getNotesNotTrashed: (state, getters) => () => {
    return getters
      .getNotes()
      .filter((note) => !note.tags.some((tag) => tag.text === 'Trash'))
  },

  getNotesTrashed: (state, getters) => () => {
    return getters
      .getNotes()
      .filter((note) => note.tags.some((tag) => tag.text === 'Trash'))
  },

  getFilteredNotes: (state, getters) => (filter) => {
    if (filter === 'Trash') {
      return getters.getNotesTrashed()
    } else if (filter) {
      return getters
        .getNotesNotTrashed()
        .filter((note) =>
          note.tags.some(
            (tag) => tag.text.toLowerCase() === filter.toLowerCase()
          )
        )
    } else {
      return getters.getNotesNotTrashed()
    }
  },

  getIsSyncing: (state) => () => {
    return state.isSyncing
  },

  getIsPersistent: (state) => () => {
    return state.isPersistent
  },

  getCurrentTag: (state) => () => {
    if (!state.currentTag) return ''
    return state.currentTag
  },

  getAvailableTags: (state, getters) => () => {
    return getters
      .getNotesNotTrashed()
      .flatMap((note) => note.tags)
      .map((note) => note.text)
  },

  getReducedTags: (state, getters) => () => {
    return getters
      .getAvailableTags()
      .filter((note, pos, arr) => arr.indexOf(note) === pos)
      .sort()
  },

  getTagAmount: (state, getters) => (tag) => {
    if (tag) {
      return getters.getAvailableTags().filter((note) => note === tag).length
    } else {
      return getters.getNotesNotTrashed().length
    }
  },

  getSnackbar: (state) => () => {
    if (!state.snackbar) return {}
    return state.snackbar
  },

  getSnackbarIsActive: (state) => () => {
    return state.snackbarIsActive
  },

  getWeather: (state) => () => {
    if (!state.weather) return {}
    return state.weather
  },

  getLocation: (state) => () => {
    if (!state.location) return {}
    return state.location
  },
}

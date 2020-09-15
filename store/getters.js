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

  getIsFetchingNotes: (state) => () => {
    return state.isFetchingNotes
  },

  getIsPersistent: (state) => () => {
    return state.isPersistent
  },

  getCurrentTag: (state) => () => {
    if (!state.currentTag) return ''
    return state.currentTag
  }
}

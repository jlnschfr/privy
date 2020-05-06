export default {
  getNote: (state) => (id) => {
    if (!state.notes) return {}
    const data = state.notes.find((note) => note.id === id)
    return data || {}
  },

  getNotes: (state) => () => {
    if (!state.notes) return []
    return state.notes
  }
}

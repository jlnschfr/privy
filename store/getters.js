export default {
  getItem: (state) => (id) => {
    if (!state.items) return
    return state.items.find((item) => item.id === id)
  }
}

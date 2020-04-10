export default {
  getItem: (state) => (id) => {
    if (!state.items) return {}
    const data = state.items.find((item) => item.id === id)
    return data || {}
  }
}

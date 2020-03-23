import { firestore } from '@/plugins/firebase.js'

export default {
  setUser(state, payload) {
    state.user = payload
  },
  setItems(state, payload) {
    state.items = payload
  },
  addItem(state, payload) {
    state.items.push(payload)
  },
  deleteItem(state, payload) {
    const index = state.items.findIndex((el) => el.id === payload.id)
    state.items.splice(index, 1)
  },
  updateItem(state, payload) {
    const index = state.items.findIndex((el) => el.id === payload.id)
    state.items[index] = payload
  },
  sortItems(state) {
    state.items.sort((a, b) => {
      if (a.isPinned || b.isPinned) {
        if (a.isPinned && !b.isPinned) {
          return -1
        } else if (a.isPinned && b.isPinned) {
          return 0
        } else {
          return 1
        }
      } else if (Date.parse(a.createdDate) >= Date.parse(b.createdDate)) {
        return -1
      } else {
        return 1
      }
    })
  },
  setStore(state, payload) {
    state.store = firestore.collection('user').doc(payload)
  }
}

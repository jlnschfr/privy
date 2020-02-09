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
  updateItem(state, payload) {
    const index = state.items.findIndex((el) => el.id === payload.id)
    state.items[index] = payload
  },
  setStore(state, payload) {
    state.store = firestore.collection('user').doc(payload)
  }
}

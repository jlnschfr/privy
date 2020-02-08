import { firestore } from '@/plugins/firebase.js'

export default {
  setUser(state, payload) {
    state.user = payload
  },
  setItems(state, payload) {
    state.items = payload
  },
  setStore(state, payload) {
    state.store = firestore.collection('user').doc(payload)
  }
}

import { auth, firestore } from '@/plugins/firebase.js'

export default {
  createUserWithEmailAndPassword({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          dispatch('handleAuthChanged', user)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  loginWithEmailAndPassword({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then((user) => {
          dispatch('handleAuthChanged', user)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  logout({ state }) {
    auth
      .signOut()
      .then(() => {
        state.user = null
        state.items = null
        state.store = null
      })
      .catch()
  },

  handleAuthChanged({ commit, dispatch }, user) {
    commit('setUser', user)
    if (user) {
      commit('setStore', user.uid)
      dispatch('getItems')
    }
  },

  addItem({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('addItem', payload)
      commit('sortItems')
      resolve(payload.id)

      state.store
        .collection('items')
        .doc(payload.id)
        .set(payload)
        .then(() => {})
        .catch(() => {})
    })
  },

  updateItem({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('updateItem', payload)
      commit('sortItems')
      resolve()

      state.store
        .collection('items')
        .doc(payload.id)
        .set(payload)
        .then(() => {})
        .catch(() => {})
    })
  },

  deleteItem({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('deleteItem', payload)
      resolve()

      state.store
        .collection('items')
        .doc(payload.id)
        .delete()
        .then(() => {})
        .catch(() => {})
    })
  },

  getItems({ state, commit }) {
    state.store
      .collection('items')
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() })
        })
        commit('setItems', items)
        commit('sortItems')
      })
  },

  enablePersistence() {
    return new Promise((resolve) => {
      firestore.enablePersistence().then(() => {
        resolve()
      })
    })
  }
}

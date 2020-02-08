import { auth } from '@/plugins/firebase.js'

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

  addItem({ state, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      state.store
        .collection('items')
        .add(payload)
        .then(() => {
          state.items.push(payload)
          resolve()
        })
    })
  },

  getItems({ state, commit }) {
    state.store
      .collection('items')
      .get()
      .then((querySnapshot) => {
        const items = []
        querySnapshot.forEach((doc) => {
          items.push(doc.data())
        })
        commit('setItems', items)
      })
  }
}

import { auth, firestore } from '@/plugins/firebase.js'

export default {
  enablePersistence({ commit }) {
    return new Promise((resolve) => {
      firestore.enablePersistence({ synchronizeTabs: true }).then(() => {
        commit('setPersistence', true)
        resolve()
      })
    })
  },

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

  logout() {
    auth
      .signOut()
      .then()
      .catch()
  },

  handleAuthChanged({ commit, dispatch }, user) {
    if (user) {
      commit('setUser', user)
      commit('setStore', user.uid)
      dispatch('getNotes')
    } else {
      commit('reset')
    }
  },

  // refactored till here

  addNote({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('addNote', payload)
      commit('sortNotes')
      resolve(payload.id)

      state.store
        .collection('notes')
        .doc(payload.id)
        .set(payload)
        .then(() => {})
        .catch(() => {})
    })
  },

  updateNote({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('updateNote', payload)
      commit('sortNotes')
      resolve()

      state.store
        .collection('notes')
        .doc(payload.id)
        .set(payload)
        .then(() => {})
        .catch(() => {})
    })
  },

  deleteNote({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('deleteNote', payload)
      resolve()

      state.store
        .collection('notes')
        .doc(payload.id)
        .delete()
        .then(() => {})
        .catch(() => {})
    })
  },

  getNotes({ state, commit }) {
    commit('setIsFetchingNotes')

    state.store
      .collection('notes')
      .get()
      .then((querySnapshot) => {
        const notes = []
        querySnapshot.forEach((doc) => {
          notes.push({ id: doc.id, ...doc.data() })
        })
        commit('setNotes', notes)
        commit('sortNotes')
      })
  },

  setCurrentTag({ commit }, payload) {
    commit('setCurrentTag', payload)
  }
}

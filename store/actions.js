import { auth, firestore } from '@/plugins/firebase.js'

export default {
  enablePersistence({ commit }) {
    return new Promise((resolve) => {
      firestore.enablePersistence({ synchronizeTabs: true }).then(() => {
        commit('setIsPersistent', true)
        resolve()
      })
    })
  },

  createUserWithEmailAndPassword({ dispatch }, payload) {
    return new Promise((resolve, reject) => {
      auth
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(({ user }) => {
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
        .then(({ user }) => {
          dispatch('handleAuthChanged', user)
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  updateEmail({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('setIsSyncing', true)
      auth
        .signInWithEmailAndPassword(auth.currentUser.email, payload.password)
        .then(({ user }) => {
          user
            .updateEmail(payload.newEmail)
            .then(() => {
              commit('setIsSyncing', false)
              resolve()
            })
            .catch((error) => {
              commit('setIsSyncing', false)
              reject(error)
            })
        })
        .catch((error) => {
          commit('setIsSyncing', false)
          reject(error)
        })
    })
  },

  updatePassword({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('setIsSyncing', true)
      auth
        .signInWithEmailAndPassword(auth.currentUser.email, payload.password)
        .then(({ user }) => {
          user
            .updatePassword(payload.newPassword)
            .then(() => {
              commit('setIsSyncing', false)
              resolve()
            })
            .catch((error) => {
              commit('setIsSyncing', false)
              reject(error)
            })
        })
        .catch((error) => {
          commit('setIsSyncing', false)
          reject(error)
        })
    })
  },

  deleteAccount({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('setIsSyncing', true)
      auth
        .signInWithEmailAndPassword(auth.currentUser.email, payload.password)
        .then(({ user }) => {
          user
            .delete()
            .then(() => {
              commit('reset')
              commit('setIsSyncing', false)
              resolve()
            })
            .catch((error) => {
              commit('setIsSyncing', false)
              reject(error)
            })
        })
        .catch((error) => {
          commit('setIsSyncing', false)
          reject(error)
        })
    })
  },

  logout({ commit }) {
    commit('setIsSyncing', true)
    auth
      .signOut()
      .then(() => {
        commit('setIsSyncing', false)
      })
      .catch(() => {
        commit('setIsSyncing', false)
      })
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

  setCurrentTag({ commit }, payload) {
    commit('setCurrentTag', payload)
  },

  showSnackbar({ commit }, payload) {
    commit('setSnackbarIsActive', false)

    setTimeout(() => {
      commit('setSnackbar', payload)
      commit('setSnackbarIsActive', true)
    }, 100)
  },

  hideSnackbar({ commit }) {
    commit('setSnackbarIsActive', false)
  },

  addNote({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('setIsSyncing', true)
      commit('addNote', payload)
      commit('sortNotes')
      resolve(payload.id)

      state.store
        .collection('notes')
        .doc(payload.id)
        .set(payload)
        .then(() => {
          commit('setIsSyncing', false)
        })
        .catch(() => {
          commit('setIsSyncing', false)
        })
    })
  },

  updateNote({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('setIsSyncing', true)
      commit('updateNote', payload)
      commit('sortNotes')
      resolve()

      state.store
        .collection('notes')
        .doc(payload.id)
        .set(payload)
        .then(() => {
          commit('setIsSyncing', false)
        })
        .catch(() => {
          commit('setIsSyncing', false)
        })
    })
  },

  deleteNote({ state, commit }, payload) {
    return new Promise((resolve) => {
      commit('setIsSyncing', true)
      commit('deleteNote', payload)
      resolve()

      state.store
        .collection('notes')
        .doc(payload.id)
        .delete()
        .then(() => {
          commit('setIsSyncing', false)
        })
        .catch(() => {
          commit('setIsSyncing', false)
        })
    })
  },

  getNotes({ state, commit }) {
    commit('setIsSyncing', true)

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
        commit('setIsSyncing', false)
      })
  },

  setWeather({ commit }, payload) {
    commit('setWeather', payload)
  },

  setLocation({ commit }, payload) {
    commit('setLocation', payload)
  }
}
